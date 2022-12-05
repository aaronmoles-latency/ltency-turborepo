import DealId from '../../../src/deal/domain/deal-id';

export class RoleIdMother {
	static create(value: string): DealId {
		return new DealId(value)
	}

	static random(): DealId {
		return DealId.random()
	}
}
