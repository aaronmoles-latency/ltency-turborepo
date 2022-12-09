import { ContainerBuilder } from 'diod';

import { RoleEntity } from '../role/infrastructure/persistence/role.entity';
import { DiTag } from '../shared/di/di-tag';
import { Module } from '../shared/module';
import ListUsers from './application/list-users';
import UserUpdater from './application/user-updater';
import { UserRepository } from './domain/user.repository';
import GetUsersController from './infrastructure/controller/get.users.controller';
import PutUserController from './infrastructure/controller/put.user.controller';
import TypeormUserRepository from './infrastructure/persistence/typeorm.user.repository';
import UserEntity from './infrastructure/persistence/user.entity';

export default class UserModule extends Module {
	static ENTITIES = [UserEntity, RoleEntity]

	register(builder: ContainerBuilder): void {
		builder.registerAndUse(UserUpdater);
		builder.registerAndUse(ListUsers);
		builder.register(UserRepository).use(TypeormUserRepository)

		builder.registerAndUse(PutUserController).addTag(DiTag.CONTROLLER);
		builder.registerAndUse(GetUsersController).addTag(DiTag.CONTROLLER);
	}
}
