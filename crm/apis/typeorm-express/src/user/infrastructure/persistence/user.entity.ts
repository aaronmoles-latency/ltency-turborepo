/* eslint-disable camelcase */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import RoleId from '../../../role/domain/role-id';
import { RoleEntity } from '../../../role/infrastructure/persistence/role.entity';
import { TypeormEntity } from '../../../shared/persistence/typeorm.entity';
import User from '../../domain/user';
import UserId from '../../domain/user-id';
import UserName from '../../domain/user-name';

@Entity('user')
export default class UserEntity extends TypeormEntity<User> {
	@PrimaryColumn('uuid')
	private readonly id: string

	@Column()
	private readonly name: string

	@Column({ type: 'uuid', name: 'role_id' })
	private readonly roleId: string

	@ManyToOne(() => RoleEntity)
	@JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
	private role!: RoleEntity

	static fromUser(user: User) {
		return new UserEntity(
			user.id.value,
			user.name.value,
			user.roleId.value,
		);
	}

	constructor(id: string, name: string, roleId: string) {
		super();
		this.id = id;
		this.name = name;
		this.roleId = roleId;
	}

	toModel(): User {
		return new User(
			new UserId(this.id),
			new UserName(this.name),
			new RoleId(this.roleId),
		);
	}
}
