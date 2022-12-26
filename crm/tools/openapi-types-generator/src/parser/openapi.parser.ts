/* eslint-disable camelcase */
import SwaggerParser from '@apidevtools/swagger-parser';
import fs from 'fs';
import { OpenAPIV3_1 } from 'openapi-types';
import * as OpenApiTypes from 'openapi-types';

import { Document, Route, RouteMethod } from '../domain';
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
			routes: [],
		};

		document.schemas = this.parseDocumentSchemas(openApiDocument);
		document.routes = this.parseRoutes(openApiDocument)

		return document;
	}

	private parseDocumentSchemas({ components }: OpenAPIV3_1.Document): Document['schemas'] {
		return components?.schemas ?? {};
	}

	private parseRoutes({ paths = {}, components = {} }: OpenAPIV3_1.Document): Document['routes'] {
		const documentPaths: Document['routes'] = []

		Object.keys(paths).forEach((apiPath) => {
			const pathDefinition = paths[apiPath]!;
			Object.keys(pathDefinition).forEach((method) => {
				const { operationId, requestBody, responses, parameters = []} = pathDefinition[method as OpenApiTypes.OpenAPIV3.HttpMethods]!;
				if (!operationId) {
					throw new Error(`Path ${apiPath} (${method}) not defined operationId value.`)
				}
				const id = toPascalCase(operationId);
				const { queryParams, pathParams } = this.parseDocumentParams(parameters, components)
				documentPaths.push({
					id,
					method: method.toUpperCase() as RouteMethod,
					route: apiPath,
					requestBody: this.parseDocumentRequestBodies(requestBody, components),
					responseBodies: this.parseDocumentResponseBodies(responses, components),
					pathParams,
					queryParams,
				})
			})
		})

		return documentPaths;
	}

	private parseDocumentRequestBodies(
		requestBody: OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.RequestBodyObject | undefined,
		components: OpenAPIV3_1.ComponentsObject,
	): Route['requestBody'] {
		if (requestBody) {
			return this.buildRequestBody(requestBody, components);
		}
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

	private parseDocumentResponseBodies(
		responses: OpenAPIV3_1.ResponsesObject | undefined,
		components: OpenAPIV3_1.ComponentsObject,
	): Route['responseBodies'] {
		if (responses) {
			const responseBodies: Route['responseBodies'] = {}
			Object.keys(responses).forEach((responseCode) => {
				const responseBody = this.buildResponseBody(responses[responseCode], components);
				if (responseBody) {
					responseBodies[toPascalCase(responseCode)] = responseBody;
				}
			})
			return responseBodies;
		}
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

	private parseDocumentParams(
		parameters: (OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.ParameterObject)[],
		components: OpenAPIV3_1.ComponentsObject,
	): Partial<Pick<Route, 'pathParams' | 'queryParams'>> {
		const pathParams: OpenApiTypes.OpenAPIV3.ParameterObject[] = [];
		const queryParams: OpenApiTypes.OpenAPIV3.ParameterObject[] = [];

		if (parameters) {
			const classifyParameters = (parameter: OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.ParameterObject) => {
				if (isReferenceObject(parameter)) {
					const componentParameter = this.findObjectReference<OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.ParameterObject>(parameter.$ref, components);
					if (componentParameter) {
						classifyParameters(componentParameter)
					}
				} else if (parameter.in === 'path') {
					pathParams.push(parameter)
				} else if (parameter.in === 'query') {
					queryParams.push(parameter)
				}
			}

			parameters.forEach((parameter) => {
				classifyParameters(parameter)
			})
		}
		return {
			pathParams: pathParams.length ? pathParams : undefined,
			queryParams: queryParams.length ? queryParams : undefined,
		}
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
}
