import { Optional } from '@latency/core';
import { Uuid } from '@latency/domain';

import { AuthAction } from './auth-action';

export default class AuthQuery {
	constructor(
		private readonly _subjectId: Uuid,
		private readonly _objectId: Optional<Uuid>,
		private readonly _action: AuthAction,
	) {
	}

	get subjectId(): Uuid {
		return this._subjectId;
	}

	get objectId(): Optional<Uuid> {
		return this._objectId;
	}

	get action(): AuthAction {
		return this._action;
	}
}
