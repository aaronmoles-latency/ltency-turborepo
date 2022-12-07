import { ContainerBuilder } from 'diod';

import { Module } from '../shared/module';
import Authorizer from './application/authorizer';

export default class AuthModule extends Module {
	static ENTITIES = []

	register(builder: ContainerBuilder): void {
		builder.registerAndUse(Authorizer);
	}
}
