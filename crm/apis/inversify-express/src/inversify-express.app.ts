import { Logger } from '@latency/core';
import { Env } from '@latency/env';
import { Server, ServerEnvType } from '@latency/express-server';
import { DataSource } from 'typeorm';

import { container } from './container';
import { registerControllers as registerRoutes } from './routes';

export class InversifyExpressApp {
	server?: Server;

	async start(): Promise<void> {
		await this.startServer()
		await this.startDatabase()
	}

	async stop(): Promise<void> {
		await this.stopServer()
		await this.stopDatabase()
	}

	/* SERVER */

	get httpServer() {
		return this.server?.getHTTPServer();
	}

	async startServer() {
		const logger = container.get<Logger>(Logger);
		const envService = container.get<Env<ServerEnvType>>(Env);
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

	/* DATABASE */

	async startDatabase(): Promise<void> {
		const dataSource = container.get<DataSource>(DataSource);
		try {
			await dataSource.initialize()
		} catch (err) {
			console.error('Error during Data Source initialization', err)
		}
	}

	async stopDatabase(): Promise<void> {
		const dataSource = container.get<DataSource>(DataSource);
		await dataSource.destroy()
	}
}
