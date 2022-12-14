import { Request, Response, Router } from 'express';

import { container } from './container';
import { config } from './container.config';
import Controller from './shared/controller';
import { controllers } from './shared/decorators/controller.decorator';
import { ControllerProvider, isControllerProvider } from './shared/di/config';
import { HttpMethod } from './shared/http-method';

function register(controller: Controller, router: Router) {
	const config = controllers.get(controller.constructor.name);
	if (!config) {
		throw new Error(`Controller ${controller.constructor.name} not have any controller annotation.`);
	}
	switch (config.method) {
		case HttpMethod.GET:
			router.get(config.path, (req: Request, res: Response) => controller.run(req, res));
			break;
		case HttpMethod.POST:
			router.post(config.path, (req: Request, res: Response) => controller.run(req, res));
			break;
		case HttpMethod.PUT:
			router.put(config.path, (req: Request, res: Response) => controller.run(req, res));
			break;
		case HttpMethod.DELETE:
			router.delete(config.path, (req: Request, res: Response) => controller.run(req, res));
			break;
		default:
			throw new Error(`Method ${config.method} not supported.`);
	}
}

export function registerControllers(router: Router) {
	const controllerProviders = config.filter((provider) => isControllerProvider(provider));
	controllerProviders.forEach((controllerProvider) => {
		const controller = container.get((controllerProvider as ControllerProvider).useClass) as Controller;
		register(controller, router);
	});
}
