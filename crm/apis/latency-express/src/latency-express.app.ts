import { container } from './container';
import { registerControllers as registerRoutes } from './routes';
import { Env } from './shared/env/Env';
import { Logger } from './shared/Logger';
import { Server } from './shared/server';

export class LatencyExpressApp {
	server?: Server;

	async start() {
		const logger = container.get(Logger);
		const envService = container.get(Env);
		this.server = new Server({
			logger,
			envService,
			registerRoutes,
		});

		return this.server.listen();
	}

	get httpServer() {
		return this.server?.getHTTPServer();
	}

	async stop() {
		return this.server?.stop();
	}
}
