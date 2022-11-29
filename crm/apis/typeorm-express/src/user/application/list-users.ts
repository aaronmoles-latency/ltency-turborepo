import { Service } from '../../shared/decorators/service.decorator';
import UserDto from '../domain/user.dto';
import { UserRepository } from '../domain/user.repository';

@Service()
export default class ListUsers {
	constructor(
		private readonly userRepository: UserRepository,
	) {
	}

	async execute(): Promise<UserDto[]> {
		return this.userRepository.findAll()
			.then((result) => result.map((user) => ({
				id: user.id.value,
				name: user.name.value,
				roleId: user.roleId.value,
			})));
	}
}
