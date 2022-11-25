import { Service } from '../../shared/decorators/service.decorator';
import { AccessTokenGenerator } from '../domain/access-token.generator';
import { AuthRepository } from '../domain/auth.repository';

@Service()
export default class AuthFirebaseAuthenticator {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly accessTokenGenerator: AccessTokenGenerator,
	) {
	}

	async run(token: string): Promise<string> {
		const auth = await this.authRepository.getAuth(token)
		return this.accessTokenGenerator.generate(auth)
	}
}
