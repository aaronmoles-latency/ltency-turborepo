import { Logger, SystemLogger } from '@latency/core';
import { Env } from '@latency/env';
import { ContainerBuilder } from 'diod';

import AuthModule from './auth/auth.module';
import DashboardModule from './dashboard/dashboard.module';
import LatencyEnv from './latency.env';
import { DiContainer } from './shared/di/diContainer';
import UserModule from './user/user.module';

const modules = [AuthModule, DashboardModule, UserModule];

export const container = DiContainer(modules, (builder: ContainerBuilder) => {
	builder.register(Logger).use(SystemLogger);
	builder.register(Env).useInstance(new LatencyEnv());
});
