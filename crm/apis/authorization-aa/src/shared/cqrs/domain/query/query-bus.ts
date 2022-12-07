import { Query } from './query';

export abstract class QueryBus {
	abstract ask<R>(query: Query): Promise<R>;
}
