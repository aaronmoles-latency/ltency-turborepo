import { Env, Logger, Server } from '@latency/express-server';
import { DataSource } from 'typeorm';

import { container } from './container';
import { registerControllers as registerRoutes } from './routes';
import TypeormExpressEnv from './typeorm-express.env';

export class TypeormExpressApp {
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
		const logger = container.get(Logger);
		const envService = container.get(Env) as TypeormExpressEnv;
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
		const dataSource = container.get(DataSource);
		try {
			await dataSource.initialize()
		} catch (err) {
			console.error('Error during Data Source initialization', err)
		}
	}

	async stopDatabase(): Promise<void> {
		const dataSource = container.get(DataSource);
		await dataSource.destroy()
	}
}
