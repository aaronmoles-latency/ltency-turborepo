import { Env } from '@latency/env';
import { DataSource, MixedList } from 'typeorm';

import { TypeormConfigEnv } from './typeorm.config.env';

export class TypeormDatasourceFactory {
	static create(
		env: Env<TypeormConfigEnv>,
		entities: MixedList<Function>,
	): DataSource {
		return new DataSource({
			type: 'postgres',
			url: env.get('DB_URL'),
			synchronize: true, // TODO set false
			logging: false,
			entities,
			subscribers: [],
			migrations: ['migrations/**/*{.ts,.js}'],
			maxQueryExecutionTime: 1000,
			migrationsRun: false,
		})
	}
}
