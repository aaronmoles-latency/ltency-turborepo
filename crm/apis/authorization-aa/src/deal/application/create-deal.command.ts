import { EventName } from '@latency/domain';

import AuthCommand from '../../auth/domain/auth.command';
import { UserPolicy } from '../../auth/domain/policy';

export default class CreateDealCommand extends AuthCommand {
	constructor(
		private readonly _id: string,
		private readonly _name: string,
		private readonly _alias: string,
		private readonly _fee: number,
		userPolicy: UserPolicy,
	) {
		super(
			EventName.command('funnel', 'deal', 'create'),
			userPolicy,
		);
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get alias(): string {
		return this._alias;
	}

	get fee(): number {
		return this._fee;
	}
}
