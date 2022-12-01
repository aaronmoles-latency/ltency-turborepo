import { DotEnv } from '@latency/env';
import { ServerEnvType } from '@latency/express-server';

import { Service } from './shared/decorators/service.decorator';

@Service()
export default class LatencyEnv extends DotEnv<ServerEnvType> {
	constructor() {
		super({
			NODE_ENV: 'dev',
			PORT: '3000',
		});
	}
}
