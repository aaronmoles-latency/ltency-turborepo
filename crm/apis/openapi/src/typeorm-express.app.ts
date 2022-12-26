import { Logger } from '@latency/core';
import { Env } from '@latency/env';
import { Server, ServerEnvType } from '@latency/express-server';

import { container } from './container';
import { registerControllers as registerRoutes } from './routes';

export class TypeormExpressApp {
	server?: Server;

	async start(): Promise<void> {
		await this.startServer()
	}

	async stop(): Promise<void> {
		await this.stopServer()
	}

	/* SERVER */

	get httpServer() {
		return this.server?.getHTTPServer();
	}

	async startServer() {
		const logger = container.get(Logger);
		const envService = container.get(Env<ServerEnvType>);
		this.server = new Server({
			logger,
			envService,
			registerRoutes,
		});

		return this.server.listen();
	}

	async stopServer() {
		return this.server?.stop();
	}
}
