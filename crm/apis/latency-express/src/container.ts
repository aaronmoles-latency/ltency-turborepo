import { ContainerBuilder } from 'diod'
import { Logger } from './shared/Logger';
import SystemLogger from './shared/system.logger';
import { Env } from './shared/env/Env';
import LatencyEnv from './latency.env';
import { DiContainer } from './shared/di/di.container';
import DashboardModule from './dashboard/dashboard.module';
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';

const modules = [
    AuthModule,
    DashboardModule,
    UserModule,
];

export const container = DiContainer(modules, (builder: ContainerBuilder) => {
    builder.register(Logger).use(SystemLogger)
    builder.register(Env).useInstance(new LatencyEnv())
})
