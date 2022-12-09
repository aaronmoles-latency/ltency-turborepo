import { EventAttributes, EventName } from '@latency/domain';

import { Command } from '../../shared/cqrs/domain/command/command';
import { UserPolicy } from './policy';

export default class AuthCommand<A> extends Command<A> {
	protected constructor(
		name: EventName,
		attributes: EventAttributes<A>,
		private readonly _userPolicy: UserPolicy,
	) {
		super(
			name,
			attributes,
		);
	}

	get userPolicy(): UserPolicy {
		return this._userPolicy;
	}
}
