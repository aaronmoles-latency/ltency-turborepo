import { Query } from '../../shared/cqrs/domain/query/query';
import WrapperExecutor from '../../shared/wrapper-executor';
import Authorizer from '../application/authorizer';
import AuthQuery from '../domain/auth.query';

export default class AuthQueryWrapperExecutor implements WrapperExecutor<Query, unknown>{
	constructor(
		private readonly authorizer: Authorizer,
	) {
	}

	async run(query: Query, next: () => Promise<unknown>): Promise<unknown> {
		if (query instanceof AuthQuery) {
			await this.authorizer.grant(query.__name, query.userPolicy)
		}
		return next();
	}
}
