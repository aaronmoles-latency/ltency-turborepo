/* eslint-disable no-console */
import 'reflect-metadata';

import { Env, EnvType } from '@latency/env';
import { DataSource } from 'typeorm';
import { MixedList } from 'typeorm/common/MixedList';

import { container } from './container';

export interface DatabaseConfigEnv extends EnvType {
	DB_HOST: string,
	DB_PORT: string,
	DB_USER: string,
	DB_PASS: string,
	DB_NAME: string,
}

export class DataSourceFactory {
	static create(env: Env<DatabaseConfigEnv>, entities: MixedList<Function>): DataSource {
		return new DataSource({
			type: 'postgres',
			host: env.get('DB_HOST'),
			// host: 'host.docker.internal',
			port: Number(env.get('DB_PORT')),
			username: env.get('DB_USER'),
			password: env.get('DB_PASS'),
			database: env.get('DB_NAME'),
			synchronize: false,
			logging: false,
			entities,
			// entities: ['./**/infrastructure/persistence/*.entity.{ts,js}'],
			subscribers: [],
			migrations: ['migrations/**/*{.ts,.js}'],
			maxQueryExecutionTime: 1000,
			migrationsRun: true,
		})
	}
}

export const AppDataSource = container.get(DataSource)
