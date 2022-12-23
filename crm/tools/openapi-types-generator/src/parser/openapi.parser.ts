/* eslint-disable camelcase */
import SwaggerParser from '@apidevtools/swagger-parser';
import fs from 'fs';
import { OpenAPIV3_1 } from 'openapi-types'
import * as OpenApiTypes from 'openapi-types';

import { Document } from '../domain';
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
			responseBodies: [],
		};

		document.schemas = this.parseDocumentSchemas(openApiDocument);
		document.requestBodies = this.parseDocumentRequestBodies(openApiDocument)
		const { pathParamsList, queryParamsList } = this.parseDocumentParams(openApiDocument)
		document.pathParamsList = pathParamsList;
		document.queryParamsList = queryParamsList;

		return document;
	}

	private parseDocumentSchemas({ components }: OpenAPIV3_1.Document): Document['schemas'] {
		return components?.schemas ?? {};
	}

	private parseDocumentRequestBodies({ paths = {} }: OpenAPIV3_1.Document): Document['requestBodies'] {
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
					if (isReferenceObject(requestBody)) {
						requestBodies[name] = requestBody;
					} else if (requestBody.content['application/json']?.schema) {
						requestBodies[name] = requestBody.content['application/json'].schema;
					} else if (requestBody.content['application/x-www-form-urlencoded']?.schema) {
						requestBodies[name] = requestBody.content['application/x-www-form-urlencoded'].schema;
					}
				}
			})
		})
		return requestBodies;
	}

	private parseDocumentParams({ paths = {}, components }: OpenAPIV3_1.Document): Pick<Document, 'pathParamsList' | 'queryParamsList'> {
		const params: Pick<Document, 'pathParamsList' | 'queryParamsList'> = {
			queryParamsList: {},
			pathParamsList: {},
		}

		const getComponentFromRef = (ref: string): string => {
			return ref.split('/').pop()!
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
							const componentParameter = components?.parameters?.[getComponentFromRef(parameter.$ref)];
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
}
