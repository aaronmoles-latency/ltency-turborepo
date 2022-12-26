import { Route } from '../domain';

export class TsRoutesGenerator {
	generateRoutes(routes: Route[]): string {
		return `export const routes = {\n${this.generateRoutesObject(routes)}}`;
	}

	private generateRoutesObject(routes: Route[]): string {
		return routes.map((route) => `${route.id}: ${this.generateRouteObject(route)}`).join('');
	}

	private generateRouteObject(route: Route): string {
		return `{\n\t\tmethod: '${route.method}',\n\t\troute: '${route.route}'\n\t},\n`
	}
}
