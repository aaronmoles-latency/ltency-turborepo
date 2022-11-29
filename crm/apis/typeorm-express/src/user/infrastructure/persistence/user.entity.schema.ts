/* eslint-disable camelcase */
import { EntitySchema } from 'typeorm';

import RoleId from '../../../role/domain/role-id';
import { ValueObjectTransformer } from '../../../shared/persistence/value-object.transformer';
import UserId from '../../domain/user-id';
import UserName from '../../domain/user-name';

export const UserEntitySchema = new EntitySchema<unknown>({
	name: 'user',
	columns: {
		id: {
			type: String,
			primary: true,
			transformer: ValueObjectTransformer(UserId),
		},
		name: {
			type: String,
			transformer: ValueObjectTransformer(UserName),
		},
		roleId: {
			type: String,
			name: 'role_id',
			transformer: ValueObjectTransformer(RoleId),
		},
	},
	relations: {
		role: {
			type: 'one-to-many',
			target: 'role',
			joinColumn: {
				name: 'role_id',
				referencedColumnName: 'id',
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
	},
})
