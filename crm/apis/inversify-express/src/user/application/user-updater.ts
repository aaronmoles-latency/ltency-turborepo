import { UseCase } from '../../shared/container/decorators';
import DomainService from '../domain/domain-service';
import User from '../domain/user';
import { UserRepository } from '../domain/user.repository';

@UseCase()
export default class UserUpdater {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly domainService: DomainService,
	) {
	}

	async execute(id: string, name: string, roleId: string): Promise<void> {
		const user = User.create(id, name, roleId)
		await this.userRepository.save(user)
		await this.domainService.execute()
	}
}
