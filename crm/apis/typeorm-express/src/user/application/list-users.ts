import { Env } from '@latency/express-server';

import { Service } from '../../shared/decorators/service.decorator';
import { TypeOrmExpressEnv } from '../../typeorm-express.env';
import { UserDtoAdapter } from '../domain/dto/user.adapter';
import UserDto from '../domain/dto/user.dto';
import { UserRepository } from '../domain/user.repository';

@Service()
export default class ListUsers {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly env: Env<TypeOrmExpressEnv>,
	) {
	}

	async execute(): Promise<UserDto[]> {
		// eslint-disable-next-line no-console
		console.warn('DB_HOST', this.env.get('DB_HOST'));
		return this.userRepository.findAll()
			.then((result) => result.map(UserDtoAdapter));
	}
}
