import { NewableClass } from '@latency/core';

import { Query } from './query';

export abstract class QueryHandler<Q extends Query, R> {
	private readonly _queryName: string;

	protected constructor(query: NewableClass<Q>) {
		this._queryName = query.name;
	}

	public subscribedTo(): string {
		return this._queryName;
	}

	abstract handle(query: Q): Promise<R>;
}
