import { UseCase } from '../../shared/container/decorators';
import User from '../domain/user';
import { UserRepository } from '../domain/user.repository';

@UseCase()
export default class UserUpdater {
	constructor(
		private readonly userRepository: UserRepository,
	) {
	}

	async execute(id: string, name: string, roleId: string): Promise<void> {
		const user = User.create(id, name, roleId)
		await this.userRepository.save(user)
	}
}
