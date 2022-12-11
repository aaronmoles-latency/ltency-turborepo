import { RoleEntity } from '../role/infrastructure/persistence/role.entity';
import { ApiModule } from '../shared/module/api.module';
import ListUsers from './application/list-users';
import UserUpdater from './application/user-updater';
import { UserRepository } from './domain/user.repository';
import GetUsersController from './infrastructure/controller/get.users.controller';
import PutUserController from './infrastructure/controller/put.user.controller';
import { TypeormUserRepository } from './infrastructure/persistence/typeorm.user.repository';
import UserEntity from './infrastructure/persistence/user.entity';

export const UserModule: ApiModule = {
	imports: [],
	entities: [UserEntity, RoleEntity],
	controllers: [
		PutUserController,
		GetUsersController,
	],
	providers: [
		{ provide: UserRepository, useClass: TypeormUserRepository },
		UserUpdater,
		ListUsers,
	],
}
