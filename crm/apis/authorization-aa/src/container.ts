import { Logger, SystemLogger } from '@latency/core';
import { Env } from '@latency/env';
import { DataSource, TypeormConfigEnv, TypeormDatasourceFactory } from '@latency/typeorm';
import { ContainerBuilder } from 'diod';

import Authorizer from './auth/application/authorizer';
import AuthModule from './auth/auth.module';
import AuthCommandWrapperExecutor from './auth/infrastructure/auth.command.wrapper-executor';
import AuthQueryWrapperExecutor from './auth/infrastructure/auth.query.wrapper-executor';
import DealModule from './deal/deal.module';
import { Command } from './shared/cqrs/domain/command/command';
import { CommandBus } from './shared/cqrs/domain/command/command-bus';
import CommandHandler from './shared/cqrs/domain/command/command-handler';
import { Query } from './shared/cqrs/domain/query/query';
import { QueryBus } from './shared/cqrs/domain/query/query-bus';
import { QueryHandler } from './shared/cqrs/domain/query/query-handler';
import {
	CommandHandlersMapper,
} from './shared/cqrs/infrastructure/command/command-handlers.mapper';
import { InMemoryCommandBus } from './shared/cqrs/infrastructure/command/in-memory.command-bus';
import InMemoryQueryBus from './shared/cqrs/infrastructure/query/in-memory.query-bus';
import QueryHandlersMapper from './shared/cqrs/infrastructure/query/query-handlers.mapper';
import { DiTag } from './shared/di/di-tag';
import { DiContainer } from './shared/di/diContainer';
import TypeormExpressEnv from './typeorm-express.env';
import UserModule from './user/user.module';

const modules = [UserModule, DealModule, AuthModule];

export const container = DiContainer(modules, (builder: ContainerBuilder) => {
	builder.register(Logger).use(SystemLogger);
	builder.register(Env).useInstance(new TypeormExpressEnv());
	// Database
	builder.register(DataSource).useFactory((container) => {
		return TypeormDatasourceFactory.create(
			container.get(Env<TypeormConfigEnv>),
			modules.flatMap((module) => module.ENTITIES),
		)
	}).asSingleton()

	// Command
	builder.register(CommandHandlersMapper)
		.useFactory((container) => {
			const commandHandlers = container
				.findTaggedServiceIdentifiers<CommandHandler<Command>>(DiTag.COMMAND_HANDLER)
				.map((identifier) => container.get(identifier))
			return new CommandHandlersMapper(commandHandlers)
		})
		.asSingleton()
	builder.register(CommandBus)
		.useFactory((container) => new InMemoryCommandBus(
			container.get(CommandHandlersMapper),
			[new AuthCommandWrapperExecutor(container.get(Authorizer))],
		))
		.asSingleton()

	// QueryHandler
	builder.register(QueryHandlersMapper)
		.useFactory((container) => {
			const queryHandlers = container
				.findTaggedServiceIdentifiers<QueryHandler<Query, unknown>>(DiTag.QUERY_HANDLER)
				.map((identifier) => container.get(identifier))
			return new QueryHandlersMapper(queryHandlers)
		})
		.asSingleton()
	builder.register(QueryBus)
		.useFactory((container) => new InMemoryQueryBus(
			container.get(QueryHandlersMapper),
			[new AuthQueryWrapperExecutor(container.get(Authorizer))],
		))
		.asSingleton()
});
