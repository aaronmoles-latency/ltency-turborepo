import { ContainerBuilder } from 'diod';

import { Module } from '../shared/module';
import AuthService from './application/auth.service';

export default class AuthModule extends Module {
	static ENTITIES = []

	register(builder: ContainerBuilder): void {
		builder.registerAndUse(AuthService);
	}
}
