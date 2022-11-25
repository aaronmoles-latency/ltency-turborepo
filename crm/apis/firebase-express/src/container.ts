import { Env, Logger } from '@latency/express-server';
import { ContainerBuilder } from 'diod';

import AuthModule from './auth/auth.module';
import FirebaseExpressEnv from './firebase-express.env';
import { DiContainer } from './shared/di/diContainer';
import SystemLogger from './shared/system.logger';

const modules = [AuthModule];

export const container = DiContainer(modules, (builder: ContainerBuilder) => {
	builder.register(Logger).use(SystemLogger);
	builder.register(Env).useInstance(new FirebaseExpressEnv());
});
