import Executor from '../../../executor';
import WrapperExecutor from '../../../wrapper-executor';
import { Query } from '../../domain/query/query';
import { QueryBus } from '../../domain/query/query-bus';
import QueryHandlersMapper from './query-handlers.mapper';

export default class InMemoryQueryBus implements QueryBus {
	private readonly executor: Executor<Query, unknown>;

	constructor(
		private readonly queryHandlersMapper: QueryHandlersMapper,
		executors: WrapperExecutor<Query, unknown>[] = [],
	) {
		this.executor = new Executor<Query, unknown>(executors);
	}

	ask<R>(query: Query): Promise<R> {
		return this.executor.run(query, () => {
			const handler = this.queryHandlersMapper.search(query);
			return handler.handle(query);
		}) as Promise<R>;
	}
}
