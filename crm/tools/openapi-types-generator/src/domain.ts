import { OpenAPIV3_1 } from 'openapi-types';

export type Document = {
	schemas: Record<string, OpenAPIV3_1.SchemaObject>,
	requestBodies: Record<string, OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject>,
	responseBodies: (OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.ResponseObject)[],
	pathParamsList: Record<string, OpenAPIV3_1.ParameterObject[]>,
	queryParamsList: Record<string, OpenAPIV3_1.ParameterObject[]>,
}
