import { DotEnv, ServerEnvType } from '@latency/express-server';

import { DatabaseConfigEnv } from './database';
import { Service } from './shared/decorators/service.decorator';

export interface TypeOrmExpressEnv extends ServerEnvType, DatabaseConfigEnv {
	PEPITO: string,
}

@Service()
export default class TypeormExpressEnv extends DotEnv<TypeOrmExpressEnv> {
	constructor() {
		super({
			NODE_ENV: 'dev',
			PORT: '3000',
			DB_HOST: '',
			DB_PORT: '',
			DB_USER: '',
			DB_PASS: '',
			DB_NAME: '',
			PEPITO: '',
		});
	}
}
