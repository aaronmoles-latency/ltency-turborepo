import { ContainerBuilder } from 'diod';

import { DiTag } from '../shared/di/di-tag';
import { Module } from '../shared/module';
import AuthFirebaseAuthenticator from './application/auth-firebase.authenticator';
import { AccessTokenGenerator } from './domain/access-token.generator';
import { AuthRepository } from './domain/auth.repository';
import AuthFirebaseController from './infrastructure/controller/auth-firebase.controller';
import FirebaseAuthRepository from './infrastructure/repository/firebase.auth.repository';
import JwtAccessTokenGenerator from './infrastructure/repository/jwt.access-token.generator';

export default class AuthModule extends Module {
	static ENTITIES = []

	register(builder: ContainerBuilder): void {
		builder.registerAndUse(AuthFirebaseController).addTag(DiTag.CONTROLLER);
		builder.registerAndUse(AuthFirebaseAuthenticator);
		builder.register(AuthRepository).use(FirebaseAuthRepository);
		builder.register(AccessTokenGenerator).use(JwtAccessTokenGenerator);
	}
}
