import Auth from '../../../src/auth/domain/auth';
import { AuthRepository } from '../../../src/auth/domain/auth.repository';
import AuthMother from '../domain/auth.mother';

export default class MockAuthRepository implements AuthRepository {
	private auth: Auth = AuthMother.create();

	async getAuth(token: string): Promise<Auth> {
		return this.auth;
	}
}
