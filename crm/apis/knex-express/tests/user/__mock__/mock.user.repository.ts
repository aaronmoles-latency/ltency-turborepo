import User from '../../../src/user/domain/user';
import { UserRepository } from '../../../src/user/domain/user.repository';
import UserMother from '../domain/user.mother';

export default class MockUserRepository implements UserRepository {
	private user: User = UserMother.create();

	private readonly saveSpy = jest.fn()

	async findAll(): Promise<User[]> {
		return [this.user];
	}

	async save(user: User): Promise<void> {
		this.saveSpy(user)
	}

	toHaveBeenCalledSave() {
		expect(this.saveSpy).toHaveBeenCalled()
	}
}
