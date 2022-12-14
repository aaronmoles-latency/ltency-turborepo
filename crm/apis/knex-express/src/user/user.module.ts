import { ContainerBuilder } from 'diod';

import { DiTag } from '../shared/di/di-tag';
import { Module } from '../shared/module';
import ListUsers from './application/list-users';
import UserUpdater from './application/user-updater';
import { UserRepository } from './domain/user.repository';
import GetUsersController from './infrastructure/controller/get.users.controller';
import PutUserController from './infrastructure/controller/put.user.controller';
import KnexUserRepository from './infrastructure/persistence/knex.user.repository';

export default class UserModule extends Module {
	register(builder: ContainerBuilder): void {
		builder.registerAndUse(UserUpdater);
		builder.registerAndUse(ListUsers);
		builder.register(UserRepository).use(KnexUserRepository)

		builder.registerAndUse(PutUserController).addTag(DiTag.CONTROLLER);
		builder.registerAndUse(GetUsersController).addTag(DiTag.CONTROLLER);
	}
}
