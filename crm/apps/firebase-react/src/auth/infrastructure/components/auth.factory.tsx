import React from 'react';
import { Auth } from './auth';
import ApiAuthRepository from '../repository/api.auth.repository';

const repository = new ApiAuthRepository()

export class AuthFactory {
	static create(
		onAuth: (accessToken: string) => void,
	): React.ReactElement {
		return <Auth repository={repository} onAuth={onAuth} />;
	}
}
