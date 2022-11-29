import { EntitySchema } from 'typeorm';

import Role from '../../domain/role';

export const RoleEntity = new EntitySchema<Role>({
	name: 'role',
	columns: {
		id: {
			type: String,
			primary: true,
		},
		name: {
			type: String,
		},
	},
})
