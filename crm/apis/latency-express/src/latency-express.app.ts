import { Logger } from '@latency/core';
import { Env } from '@latency/env';
import { Server, ServerEnvType } from '@latency/express-server';

import { container } from './container';
import { registerControllers as registerRoutes } from './routes';

export class LatencyExpressApp {
	server?: Server;

	async start() {
		const logger = container.get(Logger);
		const envService = container.get(Env<ServerEnvType>);
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
