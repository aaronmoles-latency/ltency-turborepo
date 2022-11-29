import { EntitySchema } from 'typeorm';

import Role from '../../domain/role';

export const RoleEntitySchema = new EntitySchema<Role>({
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
