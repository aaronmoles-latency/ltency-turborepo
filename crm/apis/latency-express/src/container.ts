import {ContainerBuilder} from 'diod'
import {Logger} from "./shared/Logger";
import SystemLogger from "./shared/system.logger";
import {Env} from "./shared/env/Env";
import LatencyEnv from "./latency.env";
import {DiContainer} from "./shared/di/di.container";

export const container = DiContainer((builder: ContainerBuilder) => {
    builder.register(Logger).use(SystemLogger)
    builder.register(Env).useInstance(new LatencyEnv())
})
