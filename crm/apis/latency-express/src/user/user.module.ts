import { ContainerBuilder } from 'diod';
import UserController from './user.controller';
import { DiTag } from '../shared/di/di-tag';
import UserService from './user.service';
import { Module } from '../shared/module';

export default class UserModule extends Module {
    register(builder: ContainerBuilder): void {
        builder.registerAndUse(UserController).addTag(DiTag.CONTROLLER)
        builder.registerAndUse(UserService)
    }
}
