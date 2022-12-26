import { OpenAPIV3_1 } from 'openapi-types';

export type RouteMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'TRACE'

export type Route = {
	id: string,
	method: RouteMethod,
	route: string,
	requestBody?: OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject,
	responseBodies?: Record<string, OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject>,
	pathParams?: OpenAPIV3_1.ParameterObject[],
	queryParams?: OpenAPIV3_1.ParameterObject[],
}

export type Document = {
	schemas: Record<string, OpenAPIV3_1.SchemaObject>,
	routes: Route[]
}
