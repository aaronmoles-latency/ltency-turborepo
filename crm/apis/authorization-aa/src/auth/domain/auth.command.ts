import { EventName } from '@latency/domain';

import { Command } from '../../shared/cqrs/domain/command/command';
import { UserPolicy } from './policy';

export default class AuthCommand extends Command {
	protected constructor(
		name: EventName,
		private readonly _userPolicy: UserPolicy,
	) {
		super(name);
	}

	get userPolicy(): UserPolicy {
		return this._userPolicy;
	}
}
