/* eslint-disable camelcase */
import SwaggerParser from '@apidevtools/swagger-parser';
import fs from 'fs';
import { OpenAPIV3_1 } from 'openapi-types';
import * as OpenApiTypes from 'openapi-types';

import { Document, RouteMethod } from '../domain';
import { SourceFileNotFoundError } from '../errors/source-file-not-found.error';
import { isReferenceObject } from '../functions/checks';
import { toPascalCase } from '../functions/pascal-case';

export type OpenapiParserConfig = {
	sourceFile: string,
}

export class OpenapiParser {
	constructor(private readonly config: OpenapiParserConfig) {
		const { sourceFile } = config;
		if (!fs.existsSync(sourceFile)) {
			throw new SourceFileNotFoundError(sourceFile)
		}
	}

	parseDocument(): Promise<Document> {
		return new Promise((resolve) => {
			SwaggerParser
				.bundle(this.config.sourceFile)
				.then((value) => {
					resolve(this.parseOpenAPIV3_1(value as OpenAPIV3_1.Document))
				})
		})
	}

	private parseOpenAPIV3_1(openApiDocument: OpenAPIV3_1.Document): Document {
		const document: Document = {
			schemas: {},
			pathParamsList: {},
			queryParamsList: {},
			requestBodies: {},
			responseBodies: {},
			routes: [],
		};

		document.schemas = this.parseDocumentSchemas(openApiDocument);
		document.requestBodies = this.parseDocumentRequestBodies(openApiDocument)
		document.responseBodies = this.parseDocumentResponseBodies(openApiDocument)
		const { pathParamsList, queryParamsList } = this.parseDocumentParams(openApiDocument)
		document.pathParamsList = pathParamsList;
		document.queryParamsList = queryParamsList;
		document.routes = this.parseRoutes(openApiDocument)

		return document;
	}

	private parseDocumentSchemas({ components }: OpenAPIV3_1.Document): Document['schemas'] {
		return components?.schemas ?? {};
	}

	private parseDocumentRequestBodies({ paths = {}, components = {} }: OpenAPIV3_1.Document): Document['requestBodies'] {
		const requestBodies: Document['requestBodies'] = {};
		Object.keys(paths).forEach((apiPath) => {
			const pathDefinition = paths[apiPath]!;
			Object.keys(pathDefinition).forEach((method) => {
				const { requestBody, operationId } = pathDefinition[method as OpenApiTypes.OpenAPIV3.HttpMethods]!;

				if (!operationId) {
					throw new Error(`Path ${apiPath} (${method}) not defined operationId value.`)
				}

				if (requestBody) {
					const name = `${toPascalCase(operationId)}RequestBody`;
					const requestBodyBuilded = this.buildRequestBody(requestBody, components);
					if (requestBodyBuilded) {
						requestBodies[name] = requestBodyBuilded;
					}
				}
			})
		})
		return requestBodies;
	}

	private parseDocumentResponseBodies({ paths = {}, components = {} }: OpenAPIV3_1.Document): Document['responseBodies'] {
		const responseBodies: Document['responseBodies'] = {};
		Object.keys(paths).forEach((apiPath) => {
			const pathDefinition = paths[apiPath]!;
			Object.keys(pathDefinition).forEach((method) => {
				const { responses, operationId } = pathDefinition[method as OpenApiTypes.OpenAPIV3.HttpMethods]!;

				if (!operationId) {
					throw new Error(`Path ${apiPath} (${method}) not defined operationId value.`)
				}

				if (responses) {
					Object.keys(responses).forEach((responseKey) => {
						const name = `${toPascalCase(operationId)}${toPascalCase(responseKey)}Response`;
						const responseBody = this.buildResponseBody(responses[responseKey], components);
						if (responseBody) {
							responseBodies[name] = responseBody;
						}
					})
				}
			})
		})
		return responseBodies;
	}

	private parseDocumentParams({ paths = {}, components = {} }: OpenAPIV3_1.Document): Pick<Document, 'pathParamsList' | 'queryParamsList'> {
		const params: Pick<Document, 'pathParamsList' | 'queryParamsList'> = {
			queryParamsList: {},
			pathParamsList: {},
		}

		Object.keys(paths).forEach((apiPath) => {
			const pathDefinition = paths[apiPath]!;
			Object.keys(pathDefinition).forEach((method) => {
				const { operationId, parameters: pathParameters } = pathDefinition[method as OpenApiTypes.OpenAPIV3.HttpMethods]!;
				if (!operationId) {
					throw new Error(`Path ${apiPath} (${method}) not defined operationId value.`)
				}

				if (pathParameters) {
					const pathParamsList: OpenApiTypes.OpenAPIV3.ParameterObject[] = [];
					const queryParamsList: OpenApiTypes.OpenAPIV3.ParameterObject[] = [];

					const classifyParameters = (name: string, parameter: OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.ParameterObject) => {
						if (isReferenceObject(parameter)) {
							const componentParameter = this.findObjectReference<OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.ParameterObject>(parameter.$ref, components);
							if (componentParameter) {
								classifyParameters(name, componentParameter)
							}
						} else if (parameter.in === 'path') {
							pathParamsList.push(parameter)
						} else if (parameter.in === 'query') {
							queryParamsList.push(parameter)
						}
					}

					pathParameters.forEach((parameter) => {
						classifyParameters(operationId, parameter)
					})

					if (pathParamsList.length) {
						params.pathParamsList[`${toPascalCase(operationId)}PathParams`] = pathParamsList;
					}
					if (queryParamsList.length) {
						params.queryParamsList[`${toPascalCase(operationId)}QueryParams`] = queryParamsList
					}
				}
			})
		})

		return params;
	}

	private buildRequestBody(
		responseObject: OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.RequestBodyObject,
		components: OpenAPIV3_1.ComponentsObject,
	): OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject | undefined {
		if (isReferenceObject(responseObject)) {
			return this.buildRequestBody(
				this.findObjectReference<OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.RequestBodyObject>(responseObject.$ref, components),
				components,
			)
		}
		if (responseObject.content && responseObject.content['application/json']?.schema) {
			return responseObject.content['application/json'].schema;
		}
		if (responseObject.content && responseObject.content['application/x-www-form-urlencoded']?.schema) {
			return responseObject.content['application/x-www-form-urlencoded'].schema;
		}
		return undefined
	}

	private buildResponseBody(
		responseObject: OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.ResponseObject,
		components: OpenAPIV3_1.ComponentsObject,
	): OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject | undefined {
		if (isReferenceObject(responseObject)) {
			return this.buildResponseBody(
				this.findObjectReference<OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.ResponseObject>(responseObject.$ref, components),
				components,
			)
		}
		if (responseObject.content && responseObject.content['application/json']?.schema) {
			return responseObject.content['application/json'].schema;
		}
		return undefined
	}

	private findObjectReference<T>(ref: string, components: OpenAPIV3_1.ComponentsObject): T {
		const refSplit = ref.split('/')
		const referenceName = refSplit.pop() as string
		const referenceType = refSplit.pop() as string

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const component = components[referenceType][referenceName];

		return component as T
	}

	private parseRoutes({ paths = {} }: OpenAPIV3_1.Document): Document['routes'] {
		const documentPaths: Document['routes'] = []

		Object.keys(paths).forEach((apiPath) => {
			const pathDefinition = paths[apiPath]!;
			Object.keys(pathDefinition).forEach((method) => {
				const { operationId } = pathDefinition[method as OpenApiTypes.OpenAPIV3.HttpMethods]!;
				if (!operationId) {
					throw new Error(`Path ${apiPath} (${method}) not defined operationId value.`)
				}
				const id = toPascalCase(operationId);
				documentPaths.push({
					id,
					method: method.toUpperCase() as RouteMethod,
					route: apiPath,
				})
			})
		})

		return documentPaths;
	}
}
