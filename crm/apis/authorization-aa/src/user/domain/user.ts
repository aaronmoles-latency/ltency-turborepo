import { AggregateRoot } from '@latency/domain';

import DealId from '../../deal/domain/deal-id';
import UserId from './value-object/user-id';
import UserName from './value-object/user-name';

export default class User extends AggregateRoot {
	static create(id: string, name: string, roleId: string) {
		return new User(
			new UserId(id),
			new UserName(name),
			new DealId(roleId),
		)
	}

	constructor(
		private _id: UserId,
		private _name: UserName,
		private _roleId: DealId,
	) {
		super()
	}

	get id(): UserId {
		return this._id;
	}

	get name(): UserName {
		return this._name;
	}

	get roleId(): DealId {
		return this._roleId;
	}
}
