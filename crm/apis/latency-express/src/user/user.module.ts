import { ContainerBuilder } from 'diod';

import { DiTag } from '../shared/di/di-tag';
import { Module } from '../shared/module';
import UserService from './application/user.service';
import UserController from './infrastructure/user.controller';

export default class UserModule extends Module {
	register(builder: ContainerBuilder): void {
		builder.registerAndUse(UserController).addTag(DiTag.CONTROLLER);
		builder.registerAndUse(UserService);
	}
}
