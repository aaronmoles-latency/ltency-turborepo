import { TypeOrmRepository } from '@latency/typeorm';
import { injectable } from 'inversify';
import { DataSource } from 'typeorm';

import User from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';
import UserEntity from './user.entity';

@injectable()
export class TypeormUserRepository
	extends TypeOrmRepository<User, UserEntity> implements UserRepository {
	constructor(dataSource: DataSource) {
		super(dataSource, UserEntity)
	}

	async save(user: User): Promise<void> {
		await this.persist(UserEntity.fromUser(user))
	}

	findAll(): Promise<User[]> {
		return this.repository().find()
			.then((userEntities) => userEntities.map((userEntity) => userEntity.toModel()));
	}
}
