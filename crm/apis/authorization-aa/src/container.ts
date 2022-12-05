import { Logger, SystemLogger } from '@latency/core';
import { Env } from '@latency/env';
import { DataSource, TypeormConfigEnv, TypeormDatasourceFactory } from '@latency/typeorm';
import { ContainerBuilder } from 'diod';

import AuthModule from './auth/auth.module';
import DealModule from './deal/deal.module';
import { DiContainer } from './shared/di/diContainer';
import TypeormExpressEnv from './typeorm-express.env';
import UserModule from './user/user.module';

const modules = [UserModule, DealModule, AuthModule];

export const container = DiContainer(modules, (builder: ContainerBuilder) => {
	builder.register(Logger).use(SystemLogger);
	builder.register(Env).useInstance(new TypeormExpressEnv());
	builder.register(DataSource).useFactory((container) => {
		return TypeormDatasourceFactory.create(
			container.get(Env<TypeormConfigEnv>),
			modules.flatMap((module) => module.ENTITIES),
		)
	}).asSingleton()
});
