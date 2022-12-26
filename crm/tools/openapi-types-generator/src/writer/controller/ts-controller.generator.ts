import { Route } from '../../domain';
import { NameGenerator } from '../name.generator';

export class TsControllerGenerator {
	private readonly nameGenerator: NameGenerator;

	constructor() {
		this.nameGenerator = new NameGenerator()
	}

	generateImports(routes: Route[]): string {
		return `import {\n\t${this.buildImportList(routes).join(',\n\t')},\n} from './types'\n`
	}

	private buildImportList(routes: Route[]): string[] {
		return routes.reduce<string[]>((prev, route) => {
			if (route.pathParams) {
				prev.push(this.nameGenerator.pathParams(route.id))
			}
			if (route.queryParams) {
				prev.push(this.nameGenerator.queryParams(route.id))
			}
			if (route.requestBody) {
				prev.push(this.nameGenerator.requestBody(route.id))
			}
			if (route.responseBodies) {
				prev.push(
					...Object.keys(route.responseBodies)
						.map((codeResult) => this.nameGenerator.response(route.id, codeResult)),
				)
			}
			return prev;
		}, []).sort();
	}

	generateControllers(routes: Route[]): string {
		return routes.map((route) => this.generateController(route)).join('\n')
	}

	private generateController(route: Route): string {
		return `export type ${route.id}ControllerDefinition = Controller<${this.generateRequest(route)}, ${this.generateResponse(route)}>\n`;
	}

	private generateRequest(route: Route): string {
		// type PutUserRequest = Request<PathParams, Record<string, never>, BodyRequest, QueryParams>
		return `Request<${this.generatePathParams(route)}, ${this.generateResponseType(route)}, ${this.generateRequestType(route)}, ${this.generateQueryParams(route)}>`;
	}

	private generatePathParams({ pathParams, id }: Route): string {
		if (pathParams) {
			return this.nameGenerator.pathParams(id);
		}
		return '{}'
	}

	private generateQueryParams({ queryParams, id }: Route): string {
		if (queryParams) {
			return this.nameGenerator.queryParams(id);
		}
		return '{}'
	}

	private generateRequestType({ requestBody, id }: Route): string {
		if (requestBody) {
			return this.nameGenerator.requestBody(id)
		}
		return '{}'
	}

	private generateResponse(route: Route): string {
		return `Response<${this.generateResponseType(route)}>`;
	}

	private generateResponseType({ responseBodies, id }: Route): string {
		if (responseBodies && Object.keys(responseBodies).length) {
			return Object.keys(responseBodies)
				.map((codeResult) => this.nameGenerator.response(id, codeResult))
				.join(' | ');
		}
		return '{}'
	}

	controllerInterface() {
		return `
interface Controller<Req extends Request = Request, Res extends Response = Response> {
	run(req: Req, res: Res): Promise<void>
}

`;
	}
}
