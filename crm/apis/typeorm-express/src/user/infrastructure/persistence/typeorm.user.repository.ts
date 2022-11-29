import { DataSource } from 'typeorm';

import { Repository } from '../../../shared/decorators/repository.decorator';
import { TypeOrmRepository } from '../../../shared/persistence/typeorm.repository';
import User from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';
import { UserEntity } from './user.entity';

@Repository()
export default class TypeormUserRepository extends TypeOrmRepository<User> implements UserRepository {
	constructor(dataSource: DataSource) {
		super(dataSource, UserEntity)
	}

	async save(user: User): Promise<void> {
		await this.persist(user)
	}

	findAll(): Promise<User[]> {
		return this.repository().find();
	}
}
