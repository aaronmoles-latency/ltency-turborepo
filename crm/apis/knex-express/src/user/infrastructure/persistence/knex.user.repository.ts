/* eslint-disable camelcase */
import RoleId from '../../../role/domain/role-id';
import { Repository } from '../../../shared/decorators/repository.decorator';
import { KnexConnection } from '../../../shared/knex/knex.connection';
import { InsertEntity } from '../../../shared/knex/knex.types';
import { QueryObject } from '../../domain/query-objects/QueryObject';
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

	async findAll(): Promise<User[]> {
		return this.connection.knex('user')
			.then((userEntities) =>
				userEntities.map((userEntity) => this.toModel(userEntity)))
	}

	async rawQuery<T>({ rawHaving, rawSelect, rawWhere, rawFullQuery, parseResult }: QueryObject<T>): Promise<T> {
		const query = rawFullQuery ? this.connection.knex.raw<any>(rawFullQuery().sql, rawFullQuery().params) : this.connection.knex<UserEntity[]>('user');

		if ('select' in query){
			if (rawSelect){
				query.select(this.connection.knex.raw(rawSelect()));
			}
			if (rawWhere){
				query.where(this.connection.knex.raw(rawWhere().sql, rawWhere().params));
			}
			if (rawHaving){
				query.having(this.connection.knex.raw(rawHaving().sql, rawHaving().params));
			}
		}
		return query.then((rows) => {
			if (parseResult){
				return parseResult(rows);
			}
			return rows.map((userEntity: UserEntity) => this.toModel(userEntity))
		});
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
