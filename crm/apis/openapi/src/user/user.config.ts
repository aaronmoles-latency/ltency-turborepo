import { Provider } from '../shared/di/config';
import ListUsers from './application/list-users';
import UserUpdater from './application/user-updater';
import { UserRepository } from './domain/user.repository';
import GetUsersController from './infrastructure/controller/get.users.controller';
import PutUserController from './infrastructure/controller/put.user.controller';
import TypeormUserRepository from './infrastructure/persistence/typeorm.user.repository';

export const config: Provider<unknown>[] = [
	UserUpdater,
	ListUsers,
	{ provide: UserRepository, useClass: TypeormUserRepository },
	{ route: '/user', method: 'PUT', useClass: PutUserController },
	{ route: '/user', method: 'GET', useClass: GetUsersController },
]
