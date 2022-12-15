import { Knex } from 'knex';

import { RoleEntity } from './role/infrastructure/persistence/role.entity';
import { UserEntity } from './user/infrastructure/persistence/user.entity';

export type InsertEntity<T> = Omit<T, 'created_at' | 'updated_at'>
export type UpdateEntity<T> = Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>

type Entity<T> = Knex.CompositeTableType<T, InsertEntity<T>, UpdateEntity<T>>

declare module 'knex/types/tables' {
	interface Tables {
		user: Entity<UserEntity>;
		role: Entity<RoleEntity>;
	}
}
