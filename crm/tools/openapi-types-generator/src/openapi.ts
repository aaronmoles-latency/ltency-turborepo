/* eslint-disable no-use-before-define */
import SwaggerParser from '@apidevtools/swagger-parser';
import * as fs from 'fs';
import * as OpenApiTypes from 'openapi-types'
import * as path from 'path';

export {}

function toPascalCase(string: string): string {
	return `${string}`
		.replace(new RegExp(/[-_]+/, 'g'), ' ')
		.replace(new RegExp(/[^\w\s]/, 'g'), '')
		.replace(
			new RegExp(/\s+(.)(\w*)/, 'g'),
			($1, $2, $3) => `${$2.toUpperCase() + $3}`,
		)
		.replace(new RegExp(/\w/), (s) => s.toUpperCase());
}

function isReferenceObject(object: any): object is OpenApiTypes.OpenAPIV3.ReferenceObject {
	return object['$ref']
}

function isAllOfSchema(object: OpenApiTypes.OpenAPIV3.BaseSchemaObject): object is Required<Pick<OpenApiTypes.OpenAPIV3.BaseSchemaObject, 'allOf'>> {
	return !!object.allOf
}

function isOneOfSchema(object: OpenApiTypes.OpenAPIV3.BaseSchemaObject): object is Required<Pick<OpenApiTypes.OpenAPIV3.BaseSchemaObject, 'oneOf'>> {
	return !!object.oneOf
}

function isAnyOfSchema(object: OpenApiTypes.OpenAPIV3.BaseSchemaObject): object is Required<Pick<OpenApiTypes.OpenAPIV3.BaseSchemaObject, 'anyOf'>> {
	return !!object.anyOf
}

function getComponentFromRef(ref: string): string {
	return ref.split('/').pop()!
}

function getSchemaPropertiesType({ properties, required }: OpenApiTypes.OpenAPIV3.NonArraySchemaObject): Array<[string, string]> {
	if (properties) {
		return Object
			.keys(properties)
			.map((key) => ([`${key}${(required && required.includes(key) ? '' : '?')}`, getSchema(properties[key])]))
	}
	return [];
}
function getParamPropertiesType(params: OpenApiTypes.OpenAPIV3.ParameterObject[]): Array<[string, string]> {
	return params.map((parameter) => [parameter.name, getSchema(parameter.schema!)]);
}

function getSchema(schema: OpenApiTypes.OpenAPIV3.ReferenceObject | OpenApiTypes.OpenAPIV3.SchemaObject): string {
	if (isReferenceObject(schema)) {
		return getComponentFromRef(schema['$ref']);
	}
	if (isAllOfSchema(schema)) {
		return `${schema.allOf!.map((schemaAllOf) => getSchema(schemaAllOf)).join(' & ')}` ;
	}
	if (isOneOfSchema(schema)) {
		return `${schema.oneOf!.map((schemaOneOf) => getSchema(schemaOneOf)).join(' | ')}` ;
	}
	if (isAnyOfSchema(schema)) {
		return `${schema.anyOf!.map((schemaAnyOf) => `Partial<${getSchema(schemaAnyOf)}>`).join(' | ')}` ;
	}
	if (schema.type === 'array') {
		return `Array<${getSchema(schema.items)}>` ;
	}
	if (schema.type === 'object') {
		return `{\n${getSchemaPropertiesType(schema).map(([key, type]) => `\t${key}: ${type}`).join('\n')}\n}`
	}
	if (schema.type === 'integer' || schema.type === 'number') {
		return 'number';
	}
	if (schema.type === 'boolean') {
		return 'boolean';
	}
	if (schema.type === 'string') {
		if (schema.enum) {
			return schema.enum.map((value) => `'${value}'`).join(' | ')
		}
		return 'string';
	}
	throw new Error(`Invalid schema type property ${schema.type}`)
}

const createTypeFromSchema = (name: string, schema: OpenApiTypes.OpenAPIV3.SchemaObject | OpenApiTypes.OpenAPIV3.ReferenceObject): string => {
	return `export type ${ name } = ${getSchema(schema)}\n\n`
}

const createTypeFromParam = (name: string, params: OpenApiTypes.OpenAPIV3.ParameterObject[]): string => {
	return `export type ${ name } = {\n${getParamPropertiesType(params).map(([key, type]) => `\t${key}: ${type}`).join('\n')}\n}\n\n`
}

const createTypesFile = (document: OpenApiTypes.OpenAPIV3.Document) => {
	fs.writeFileSync(path.resolve(__dirname, 'types.ts'), '')
	const schemas = document.components?.schemas;
	if (schemas) {
		Object.keys(schemas).forEach((schemaName) => {
			fs.appendFileSync(
				path.resolve(__dirname, 'types.ts'),
				createTypeFromSchema(schemaName, schemas[schemaName]),
			)
		})
	}
	Object.keys(document.paths).forEach((apiPath) => {
		const pathDefinition = document.paths[apiPath]!;
		Object.keys(pathDefinition).forEach((method) => {
			const methodDefinition = pathDefinition[method as OpenApiTypes.OpenAPIV3.HttpMethods]!;
			if (!methodDefinition.operationId) {
				throw new Error(`Path ${apiPath} (${method}) not defined operationId value.`)
			}

			const requestBody = methodDefinition.requestBody;
			if (requestBody) {
				if (isReferenceObject(requestBody)) {
					fs.appendFileSync(
						path.resolve(__dirname, 'types.ts'),
						createTypeFromSchema(`${toPascalCase(methodDefinition.operationId)}RequestBody`, requestBody as OpenApiTypes.OpenAPIV3.ReferenceObject),
					)
				} else if (requestBody.content['application/json'] || requestBody.content['application/x-www-form-urlencoded']) {
					fs.appendFileSync(
						path.resolve(__dirname, 'types.ts'),
						createTypeFromSchema(
							`${toPascalCase(methodDefinition.operationId!)}RequestBody`,
							(requestBody.content['application/json'].schema || requestBody.content['application/x-www-form-urlencoded'].schema) as OpenApiTypes.OpenAPIV3.SchemaObject,
						),
					)
				}
			}

			const parameters = methodDefinition.parameters;
			if (parameters) {
				const pathParamsList: OpenApiTypes.OpenAPIV3.ParameterObject[] = [];
				const queryParamsList: OpenApiTypes.OpenAPIV3.ParameterObject[] = [];

				const classifyParameters = (parameter: OpenApiTypes.OpenAPIV3.ReferenceObject | OpenApiTypes.OpenAPIV3.ParameterObject) => {
					if (isReferenceObject(parameter)) {
						const componentParameter = document.components?.parameters?.[getComponentFromRef(parameter.$ref)];
						if (componentParameter) {
							classifyParameters(componentParameter)
						}
					} else if (parameter.in === 'path') {
						pathParamsList.push(parameter)
					} else if (parameter.in === 'query') {
						queryParamsList.push(parameter)
					}
				}

				parameters.forEach((parameter) => {
					classifyParameters(parameter)
				})

				if (pathParamsList.length) {
					fs.appendFileSync(
						path.resolve(__dirname, 'types.ts'),
						createTypeFromParam(`${toPascalCase(methodDefinition.operationId!)}PathParams`, pathParamsList),
					)
				}
				if (queryParamsList.length) {
					fs.appendFileSync(
						path.resolve(__dirname, 'types.ts'),
						createTypeFromParam(`${toPascalCase(methodDefinition.operationId!)}QueryParams`, queryParamsList),
					)
				}
			}
		})
	})
}

SwaggerParser
	.bundle(path.resolve(__dirname, '../../../docs/api/api.openapi.yaml'))
	.then((value) => {
		console.log(value)
		// console.log(value.paths['/pet'].put)
		createTypesFile(value as OpenApiTypes.OpenAPIV3.Document)
	})
