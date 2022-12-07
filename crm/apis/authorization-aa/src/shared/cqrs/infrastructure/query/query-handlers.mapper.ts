import { Query } from '../../domain/query/query';
import { QueryHandler } from '../../domain/query/query-handler';
import { QueryNotRegisteredError } from '../../domain/query/query-not-registered.error';

export default class QueryHandlersMapper extends Map<string, QueryHandler<Query, unknown>>{
	constructor(
		queryHandlers: Array<QueryHandler<Query, unknown>>,
	) {
		super()
		queryHandlers.forEach((queryHandler) => {
			this.set(queryHandler.subscribedTo(), queryHandler);
		});
	}

	public search(query: Query): QueryHandler<Query, any> {
		const queryHandler = this.get(query.constructor.name);
		if (!queryHandler) {
			throw new QueryNotRegisteredError(query);
		}
		return queryHandler;
	}
}
