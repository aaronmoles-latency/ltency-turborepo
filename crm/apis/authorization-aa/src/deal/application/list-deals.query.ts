import { EventName } from '@latency/domain';

import AuthQuery from '../../auth/domain/auth.query';
import { UserPolicy } from '../../auth/domain/policy';

export default class ListDealsQuery extends AuthQuery {
	constructor(
		userPolicy: UserPolicy,
	) {
		super(
			EventName.query('funnel', 'deal', 'list'),
			userPolicy,
		);
	}
}
