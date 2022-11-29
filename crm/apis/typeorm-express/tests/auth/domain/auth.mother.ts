import Auth from '../../../src/user/domain/auth';

export default class AuthMother {
	static create(
		id = 'random_id',
		email = 'random@email.com',
	) {
		return new Auth(id, email)
	}
}
