import { Env, Logger } from '@latency/express-server';
import { ContainerBuilder } from 'diod';
import { DataSource } from 'typeorm';

import { DataSourceConfigEnv, DataSourceFactory } from './database';
import { DiContainer } from './shared/di/diContainer';
import SystemLogger from './shared/system.logger';
import TypeormExpressEnv from './typeorm-express.env';
import UserModule from './user/user.module';

const modules = [UserModule];

export const container = DiContainer(modules, (builder: ContainerBuilder) => {
	builder.register(Logger).use(SystemLogger);
	builder.register(Env).useInstance(new TypeormExpressEnv());
	builder.register(DataSource).useFactory((container) => {
		return DataSourceFactory.create(
			container.get(Env<DataSourceConfigEnv>),
			modules.flatMap((module) => module.ENTITIES),
		)
	}).asSingleton()
});
