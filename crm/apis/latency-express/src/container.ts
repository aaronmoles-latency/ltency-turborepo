import { ContainerBuilder } from 'diod';
import { Env, Logger } from 'express-server';

import AuthModule from './auth/auth.module';
import DashboardModule from './dashboard/dashboard.module';
import LatencyEnv from './latency.env';
import { DiContainer } from './shared/di/diContainer';
import SystemLogger from './shared/system.logger';
import UserModule from './user/user.module';

const modules = [AuthModule, DashboardModule, UserModule];

export const container = DiContainer(modules, (builder: ContainerBuilder) => {
	builder.register(Logger).use(SystemLogger);
	builder.register(Env).useInstance(new LatencyEnv());
});
