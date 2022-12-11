import { DotEnv } from '@latency/env';
import { ServerEnvType } from '@latency/express-server';
import { TypeormConfigEnv } from '@latency/typeorm';

export interface InversifyExpressEnv extends ServerEnvType, TypeormConfigEnv {
}

export default class TypeormExpressEnv extends DotEnv<InversifyExpressEnv> {
	constructor() {
		super({
			NODE_ENV: 'dev',
			PORT: '3000',
			DB_URL: '',
		});
	}
}
