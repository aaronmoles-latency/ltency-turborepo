import { EventName } from '@latency/domain';

import { Query } from '../../shared/cqrs/domain/query/query';
import { UserPolicy } from './policy';

export default class AuthQuery extends Query {
	protected constructor(
		action: EventName,
		private readonly _userPolicy: UserPolicy,
	) {
		super(action);
	}

	get userPolicy(): UserPolicy {
		return this._userPolicy;
	}
}
