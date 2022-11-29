import { Env, Logger } from '@latency/express-server';
import { ContainerBuilder } from 'diod';
import { DataSource } from 'typeorm';

import { AppDataSource } from './database';
import { DiContainer } from './shared/di/diContainer';
import SystemLogger from './shared/system.logger';
import TypeormExpressEnv from './typeorm-express.env';
import UserModule from './user/user.module';

const modules = [UserModule];

export const container = DiContainer(modules, (builder: ContainerBuilder) => {
	builder.register(Logger).use(SystemLogger);
	builder.register(Env).useInstance(new TypeormExpressEnv());
	builder.register(DataSource).useInstance(AppDataSource)
});
