import { OpenAPIV3_1 } from 'openapi-types';

export function isReferenceObject(object: any): object is OpenAPIV3_1.ReferenceObject {
	return !!object['$ref']
}

export function isAllOfSchema(object: OpenAPIV3_1.BaseSchemaObject): object is Required<Pick<OpenAPIV3_1.BaseSchemaObject, 'allOf'>> {
	return !!object.allOf
}

export function isOneOfSchema(object: OpenAPIV3_1.BaseSchemaObject): object is Required<Pick<OpenAPIV3_1.BaseSchemaObject, 'oneOf'>> {
	return !!object.oneOf
}

export function isAnyOfSchema(object: OpenAPIV3_1.BaseSchemaObject): object is Required<Pick<OpenAPIV3_1.BaseSchemaObject, 'anyOf'>> {
	return !!object.anyOf
}
