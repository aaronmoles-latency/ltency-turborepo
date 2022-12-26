export class NameGenerator {
	requestBody(id: string): string {
		return `${id}RequestBody`
	}

	response(id: string, responseCode: string): string {
		return `${id}${responseCode}Response`
	}

	pathParams(id: string): string {
		return `${id}PathParams`;
	}

	queryParams(id: string): string {
		return `${id}QueryParams`
	}
}
