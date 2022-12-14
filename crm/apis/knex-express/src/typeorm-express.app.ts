import { Logger } from '@latency/core';
import { Env } from '@latency/env';
import { Server, ServerEnvType } from '@latency/express-server';

import { container } from './container';
import { registerControllers as registerRoutes } from './routes';
import { KnexConnection } from './shared/knex/knex.connection';
import { TypeOrmExpressEnv } from './typeorm-express.env';

export class TypeormExpressApp {
	server?: Server;

	logger: Logger;

	env: Env<TypeOrmExpressEnv>;

	constructor() {
		this.logger = container.get(Logger);
		this.env = container.get(Env<TypeOrmExpressEnv>);
	}

	async start(): Promise<void> {
		await this.execMigrations()
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
		this.server = new Server({
			logger: this.logger,
			envService: this.env as unknown as Env<ServerEnvType>,
			registerRoutes,
		});

		return this.server.listen();
	}

	async stopServer() {
		return this.server?.stop();
	}

	/* DB MIGRATIONS */

	private async execMigrations(): Promise<void> {
		// if (this.env.isTestEnv()) {
		const knexConnection = container.get(KnexConnection)
		await knexConnection.migrateLatest()
		// }
	}
}
