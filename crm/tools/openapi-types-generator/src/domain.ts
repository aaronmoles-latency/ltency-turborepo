import { OpenAPIV3_1 } from 'openapi-types';

export type RouteMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'TRACE'

export type Route = {
	id: string,
	method: RouteMethod,
	route: string,
	requestBodies?: string[],
	responseBodies?: string[],
	pathParam?: string,
	queryParam?: string,
}

export type Document = {
	schemas: Record<string, OpenAPIV3_1.SchemaObject>,
	requestBodies: Record<string, OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject>,
	responseBodies: Record<string, OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject>,
	pathParamsList: Record<string, OpenAPIV3_1.ParameterObject[]>,
	queryParamsList: Record<string, OpenAPIV3_1.ParameterObject[]>,
	routes: Route[]
}
