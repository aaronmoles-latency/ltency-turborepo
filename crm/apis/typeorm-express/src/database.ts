/* eslint-disable no-console */
import 'reflect-metadata';

import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'latency',
	password: 'password',
	database: 'latency',
	synchronize: false,
	logging: false,
	entities: ['./**/infrastructure/persistence/*.entity.{ts,js}'],
	subscribers: [],
	migrations: ['migrations/**/*{.ts,.js}'],
	maxQueryExecutionTime: 1000,
	migrationsRun: true,
})
