import { DotEnv } from '@latency/env';
import { ServerEnvType } from '@latency/express-server';
import { TypeormConfigEnv } from '@latency/typeorm';

import { Service } from './shared/decorators/service.decorator';

export interface TypeOrmExpressEnv extends ServerEnvType, TypeormConfigEnv {
}

@Service()
export default class TypeormExpressEnv extends DotEnv<TypeOrmExpressEnv> {
	constructor() {
		super({
			NODE_ENV: 'dev',
			PORT: '3000',
			DB_URL: '',
		});
	}
}
