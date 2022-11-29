import { Column, Entity, PrimaryColumn } from 'typeorm';

import { TypeormEntity } from '../../../shared/persistence/typeorm.entity';
import Role from '../../domain/role';
import RoleId from '../../domain/role-id';

@Entity('role')
export class RoleEntity extends TypeormEntity<Role> {
	@PrimaryColumn('uuid')
	readonly id: string;

	@Column()
	readonly name: string;

	constructor(id: string, name: string) {
		super();
		this.id = id;
		this.name = name;
	}

	toModel(): Role {
		return new Role(
			new RoleId(this.id),
			this.name,
		);
	}
}
