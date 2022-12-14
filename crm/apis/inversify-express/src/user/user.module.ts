import { RoleEntity } from '../role/infrastructure/persistence/role.entity';
import { HttpMethod } from '../shared/http-method';
import { ApiModuleDefinition } from '../shared/module/api.module';
import ListUsers from './application/list-users';
import UserUpdater from './application/user-updater';
import DomainService from './domain/domain-service';
import { UserRepository } from './domain/user.repository';
import GetUsersController from './infrastructure/controller/get.users.controller';
import PutUserController from './infrastructure/controller/put.user.controller';
import { TypeormUserRepository } from './infrastructure/persistence/typeorm.user.repository';
import UserEntity from './infrastructure/persistence/user.entity';

export const UserModule: ApiModuleDefinition = {
	imports: [],
	entities: [UserEntity, RoleEntity],
	controllers: [
		{
			method: HttpMethod.GET,
			path: '/user',
			controller: GetUsersController,
		},
		{
			method: HttpMethod.PUT,
			path: '/user/:id',
			controller: PutUserController,
		},
	],
	providers: [
		{ provide: UserRepository, useClass: TypeormUserRepository },
		UserUpdater,
		ListUsers,
		DomainService,
	],
}
