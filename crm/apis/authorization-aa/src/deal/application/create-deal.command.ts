import { EventAttributes, EventName } from '@latency/domain';

import AuthCommand from '../../auth/domain/auth.command';
import { UserPolicy } from '../../auth/domain/policy';

type CreateDealCommandAttributes = {
	id: string;
	name: string;
	alias: string;
	fee: number,
}

export default class CreateDealCommand extends AuthCommand<CreateDealCommandAttributes> {
	constructor(
		data: CreateDealCommandAttributes,
		userPolicy: UserPolicy,
	) {
		super(
			EventName.command('funnel', 'deal', 'create'),
			new EventAttributes(data),
			userPolicy,
		);
	}
}
