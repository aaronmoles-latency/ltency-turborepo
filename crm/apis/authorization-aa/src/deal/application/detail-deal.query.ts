import { EventName } from '@latency/domain';

import AuthQuery from '../../auth/domain/auth.query';
import { UserPolicy } from '../../auth/domain/policy';

export default class DetailDealQuery extends AuthQuery {
	constructor(
		private readonly _id: string,
		userPolicy: UserPolicy,
	) {
		super(
			EventName.query('funnel', 'deal', 'create'),
			userPolicy,
		);
	}

	get id(): string {
		return this._id;
	}
}
