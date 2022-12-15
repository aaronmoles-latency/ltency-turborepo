/* eslint-disable camelcase */
import { InsertEntity } from '../../../knex';
import RoleId from '../../../role/domain/role-id';
import { Repository } from '../../../shared/decorators/repository.decorator';
import { KnexConnection } from '../../../shared/knex/knex.connection';
import User from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';
import UserId from '../../domain/value-object/user-id';
import UserName from '../../domain/value-object/user-name';
import { UserEntity } from './user.entity';

@Repository()
export default class KnexUserRepository implements UserRepository {
	constructor(private readonly connection: KnexConnection) {
	}

	async save(user: User): Promise<void> {
		await this.connection.knex('user')
			.insert(this.toEntity(user))
			.onConflict('id')
			.merge()
	}

	findAll(): Promise<User[]> {
		return this.connection.knex('user')
			.then((userEntities) =>
				userEntities.map((userEntity) => this.toModel(userEntity)))
	}

	private toEntity(user: User): InsertEntity<UserEntity> {
		return ({
			id: user.id.value,
			name: user.name.value,
			role_id: user.roleId.value,
		});
	}

	private toModel(entity: UserEntity): User {
		return new User(
			new UserId(entity.id),
			new UserName(entity.name),
			new RoleId(entity.role_id),
		);
	}
}
