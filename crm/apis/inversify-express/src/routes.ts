import { Request, Response, Router } from 'express';

import { container } from './container';
import { getProviderId } from './shared/container/provider.types';
import Controller from './shared/controller';
import { HttpMethod } from './shared/http-method';
import { ControllerDefinition } from './shared/module/controller.definition';

function register(definition: ControllerDefinition, router: Router) {
	const controller = container.get<Controller>(getProviderId(definition.controller));
	switch (definition.method) {
		case HttpMethod.GET:
			router.get(definition.path, (req: Request, res: Response) => controller.run(req, res));
			break;
		case HttpMethod.POST:
			router.post(definition.path, (req: Request, res: Response) => controller.run(req, res));
			break;
		case HttpMethod.PUT:
			router.put(definition.path, (req: Request, res: Response) => controller.run(req, res));
			break;
		case HttpMethod.DELETE:
			router.delete(definition.path, (req: Request, res: Response) => controller.run(req, res));
			break;
		default:
			throw new Error(`Method ${definition.method} not supported.`);
	}
}

export function registerControllers(router: Router) {
	const definitions = container.getControllerDefinitions();
	definitions.forEach((definition) => {
		register(definition, router);
	});
}
