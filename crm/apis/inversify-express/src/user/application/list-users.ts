import { UseCase } from '../../shared/container/decorators';
import { UserDtoAdapter } from '../domain/dto/user.adapter';
import UserDto from '../domain/dto/user.dto';
import { UserRepository } from '../domain/user.repository';

@UseCase()
export default class ListUsers {
	constructor(
		private readonly userRepository: UserRepository,
	) {
	}

	async execute(): Promise<UserDto[]> {
		return this.userRepository.findAll()
			.then((result) => result.map(UserDtoAdapter));
	}
}
