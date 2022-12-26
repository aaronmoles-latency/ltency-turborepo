import { Logger, SystemLogger } from '@latency/core';
import { Env } from '@latency/env';
import { ContainerBuilder } from 'diod';

import { DiContainer } from './shared/di/diContainer';
import TypeormExpressEnv from './typeorm-express.env';
import UserModule from './user/user.module';

const modules = [UserModule];

export const container = DiContainer(modules, (builder: ContainerBuilder) => {
	builder.register(Logger).use(SystemLogger);
	builder.register(Env).useInstance(new TypeormExpressEnv());
});
