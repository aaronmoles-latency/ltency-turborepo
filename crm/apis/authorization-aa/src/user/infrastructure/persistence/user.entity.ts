/* eslint-disable camelcase */
import { TypeormEntity } from '@latency/typeorm';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import DealId from '../../../deal/domain/deal-id';
import { DealEntity } from '../../../deal/infrastructure/persistence/deal.entity';
import User from '../../domain/user';
import UserId from '../../domain/value-object/user-id';
import UserName from '../../domain/value-object/user-name';

@Entity('user')
export default class UserEntity extends TypeormEntity<User> {
	@PrimaryColumn('uuid')
	private readonly id: string

	@Column()
	private readonly name: string

	@Column({ type: 'uuid', name: 'role_id' })
	private readonly roleId: string

	@ManyToOne(() => DealEntity)
	@JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
	private role!: DealEntity

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
			new DealId(this.roleId),
		);
	}
}
