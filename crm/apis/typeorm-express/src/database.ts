/* eslint-disable no-console */
import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { RoleEntity } from './role/infrastructure/persistence/role.entity';
import UserEntity from './user/infrastructure/persistence/user.entity';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	// host: 'host.docker.internal',
	port: 5432,
	username: 'latency',
	password: 'password',
	database: 'latency',
	synchronize: false,
	logging: false,
	entities: [UserEntity, RoleEntity],
	// entities: ['./**/infrastructure/persistence/*.entity.{ts,js}'],
	subscribers: [],
	migrations: ['migrations/**/*{.ts,.js}'],
	maxQueryExecutionTime: 1000,
	migrationsRun: true,
})
