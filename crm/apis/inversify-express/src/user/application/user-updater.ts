import { injectable } from 'inversify';

import User from '../domain/user';
import { UserRepository } from '../domain/user.repository';

@injectable()
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
