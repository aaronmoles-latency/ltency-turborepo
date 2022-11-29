import Auth from '../../../src/user/domain/auth';
import { UserRepository } from '../../../src/user/domain/user.repository';
import AuthMother from '../domain/auth.mother';

export default class MockAuthRepository implements UserRepository {
	private auth: Auth = AuthMother.create();

	async getAuth(token: string): Promise<Auth> {
		return this.auth;
	}
}
