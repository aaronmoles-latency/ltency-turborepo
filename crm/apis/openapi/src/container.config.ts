import { Logger, SystemLogger } from '@latency/core';
import { Env } from '@latency/env';

import { Provider } from './shared/di/config';
import TypeormExpressEnv from './typeorm-express.env';
import { config as userConfig } from './user/user.config'

export const config: Provider<unknown>[] = [
	{ provide: Logger, useClass: SystemLogger },
	{ provide: Env, useInstance: new TypeormExpressEnv() },
	...userConfig,
]
