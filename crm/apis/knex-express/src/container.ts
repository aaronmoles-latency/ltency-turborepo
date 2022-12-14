import { Logger, SystemLogger } from '@latency/core';
import { Env } from '@latency/env';
import { TypeormConfigEnv } from '@latency/typeorm';
import { ContainerBuilder } from 'diod';
import knex from 'knex';

import { DiContainer } from './shared/di/diContainer';
import { KnexConnection } from './shared/knex/knex.connection';
import TypeormExpressEnv from './typeorm-express.env';
import UserModule from './user/user.module';

const modules = [UserModule];

export const container = DiContainer(modules, (builder: ContainerBuilder) => {
	builder.register(Logger).use(SystemLogger);
	builder.register(Env).useInstance(new TypeormExpressEnv());
	builder.register(KnexConnection).useFactory((container) => {
		const env = container.get<Env<TypeormConfigEnv>>(Env)
		const logger = container.get(Logger)
		return new KnexConnection(
			logger,
			knex({
				client: 'pg',
				connection: env.get('DB_URL'),
				migrations: {
					directory: './migrations',
					disableMigrationsListValidation: true,
					tableName: 'migration',
					extension: 'ts',
					loadExtensions: ['.ts'],
				},
				seeds: {
					directory: './fixtures',
					extension: 'ts',
					loadExtensions: ['.ts'],
				},
			}),
		);
	}).asSingleton()
});
