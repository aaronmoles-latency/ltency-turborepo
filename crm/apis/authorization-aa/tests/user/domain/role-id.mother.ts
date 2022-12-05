import RoleId from '../../../src/deal/domain/role-id';

export class RoleIdMother {
	static create(value: string): RoleId {
		return new RoleId(value)
	}

	static random(): RoleId {
		return RoleId.random()
	}
}
