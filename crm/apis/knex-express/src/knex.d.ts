import { RoleEntity } from './role/infrastructure/persistence/role.entity';
import { KnexEntity } from './shared/knex/knex.types';
import { UserEntity } from './user/infrastructure/persistence/user.entity';

declare module 'knex/types/tables' {
	interface Tables {
		user: KnexEntity<UserEntity>;
		role: KnexEntity<RoleEntity>;
	}
}
