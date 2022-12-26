import { OpenAPIV3_1 } from 'openapi-types';

import {
	isAllOfSchema,
	isAnyOfSchema,
	isOneOfSchema,
	isReferenceObject,
} from '../functions/checks';

export class TsTypesGenerator {
	public generateSchema(name: string, schema: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject): string {
		return `export type ${ name } = ${this.getSchema(schema)}\n\n`
	}

	public generateParam(name: string, params: OpenAPIV3_1.ParameterObject[]): string {
		return `export type ${ name } = {\n${this.getParamPropertiesType(params).map(([key, type]) => `\t${key}: ${type}`).join('\n')}\n}\n\n`
	}

	private getComponentFromRef(ref: string): string {
		return ref.split('/').pop()!
	}

	private getSchemaPropertiesType({ properties, required }: OpenAPIV3_1.NonArraySchemaObject): Array<[string, string]> {
		if (properties) {
			return Object
				.keys(properties)
				.map((key) => ([`${key}${(required && required.includes(key) ? '' : '?')}`, this.getSchema(properties[key])]))
		}
		return [];
	}

	private getParamPropertiesType(params: OpenAPIV3_1.ParameterObject[]): Array<[string, string]> {
		return params.map((parameter) => [parameter.name, this.getSchema(parameter.schema!)]);
	}

	private getSchema(schema: OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject): string {
		if (isReferenceObject(schema)) {
			return this.getComponentFromRef(schema['$ref']);
		}
		if (isAllOfSchema(schema)) {
			return `${schema.allOf!.map((schemaAllOf) => this.getSchema(schemaAllOf)).join(' & ')}` ;
		}
		if (isOneOfSchema(schema)) {
			return `${schema.oneOf!.map((schemaOneOf) => this.getSchema(schemaOneOf)).join(' | ')}` ;
		}
		if (isAnyOfSchema(schema)) {
			return `${schema.anyOf!.map((schemaAnyOf) => `Partial<${this.getSchema(schemaAnyOf)}>`).join(' | ')}` ;
		}
		if (schema.type === 'array') {
			return `Array<${this.getSchema(schema.items)}>` ;
		}
		if (schema.type === 'object') {
			return `{\n${this.getSchemaPropertiesType(schema).map(([key, type]) => `\t${key}: ${type}`).join('\n')}\n}`
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
}
