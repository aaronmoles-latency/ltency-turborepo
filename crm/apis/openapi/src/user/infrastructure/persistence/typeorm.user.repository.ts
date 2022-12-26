import { Repository } from '../../../shared/decorators/repository.decorator';
import User from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';

@Repository()
export default class TypeormUserRepository implements UserRepository {
	async save(user: User): Promise<void> {

	}

	async findAll(): Promise<User[]> {
		return []
	}
}
