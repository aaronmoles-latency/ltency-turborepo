import { DotEnv, ServerEnv } from '@latency/express-server';

import { Service } from './shared/decorators/service.decorator';

export interface TypeOrmExpressEnv extends ServerEnv {
	DB_HOST: string,
}

@Service()
export default class TypeormExpressEnv extends DotEnv<TypeOrmExpressEnv> {
	constructor() {
		super({
			NODE_ENV: 'dev',
			PORT: '3000',
			DB_HOST: '',
		});
	}
}
