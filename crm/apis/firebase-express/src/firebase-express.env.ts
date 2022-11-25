import { DotEnv, EnvType } from '@latency/express-server';

import { Service } from './shared/decorators/service.decorator';

type Env = EnvType

@Service()
export default class FirebaseExpressEnv extends DotEnv<Env> {
	constructor() {
		super({
			NODE_ENV: 'dev',
			PORT: '3000',
		});
	}
}
