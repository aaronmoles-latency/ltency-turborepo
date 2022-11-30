import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import express, { Request, Response, Router as ExpressRouter } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';

import { Env, ServerEnv } from '../env';
import { Logger } from '../logger';

export interface ServerConfig {
	logger: Logger,
	envService: Env<ServerEnv>,
	registerRoutes: (router: ExpressRouter) => void
}

export class Server {
	private express: express.Express;

	readonly port: string;

	private logger: Logger;

	httpServer?: http.Server;

	constructor({ logger, envService, registerRoutes }: ServerConfig) {
		this.port = envService.get('PORT');
		this.logger = logger;
		this.express = express();
		this.express.use(bodyParser.urlencoded({ extended: true }));
		this.express.use(bodyParser.json());
		this.express.use(helmet.xssFilter());
		this.express.use(helmet.noSniff());
		this.express.use(helmet.hidePoweredBy());
		this.express.use(helmet.frameguard({ action: 'deny' }));
		this.express.use(compress());
		const router = Router();
		router.use(cors());
		this.express.use(router);
		registerRoutes(router);

		router.use((err: Error, req: Request, res: Response, next: Function) => {
			this.logger.error(err);
			res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
		});
	}

	async listen(): Promise<void> {
		return new Promise((resolve) => {
			this.httpServer = this.express.listen(this.port, () => {
				this.logger.info(
					`  Backoffice Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`,
				);
				this.logger.info('  Press CTRL-C to stop\n');
				resolve();
			});
		});
	}

	getHTTPServer() {
		return this.httpServer;
	}

	async stop(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.httpServer) {
				this.httpServer.close((error) => {
					if (error) {
						reject(error);
					}
					resolve();
				});
			}

			resolve();
		});
	}
}
