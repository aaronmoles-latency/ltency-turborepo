import { AggregateRoot } from '../../shared/domain/aggregate-root';
import RoleId from './role-id';

export default class Role extends AggregateRoot {
	constructor(
		private readonly _id: RoleId,
		private readonly _name: string,
	) {
		super();
	}

	get id(): RoleId {
		return this._id;
	}

	get name(): string {
		return this._name;
	}
}
