import UserName from '../../../src/user/domain/value-object/user-name';

export default class UserNameMother {
	static create(value: string): UserName {
		return new UserName(value)
	}

	static random() {
		return this.create('random value')
	}
}
