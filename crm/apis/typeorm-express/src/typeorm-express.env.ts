import { DotEnv, ServerEnv } from '@latency/express-server';

import { DataSourceConfigEnv } from './database';
import { Service } from './shared/decorators/service.decorator';

export interface TypeOrmExpressEnv extends ServerEnv, DataSourceConfigEnv {

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
		});
	}
}
