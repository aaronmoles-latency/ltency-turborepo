import UserId from '../../../src/user/domain/value-object/user-id';

export class UserIdMother {
	static create(value: string): UserId {
		return new UserId(value)
	}

	static random() {
		return UserId.random()
	}
}
