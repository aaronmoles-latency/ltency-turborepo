import { Service } from '../../shared/decorators/service.decorator';
import { AuthRepository } from '../domain/auth.repository';

@Service()
export default class RegisterService {
	constructor(private readonly authRepository: AuthRepository) {
	}

	async run(): Promise<void> {
		await this.authRepository.save();
	}
}
