import React, { FC } from 'react';
import { GoogleLoginButton } from './google-login.button';
import AuthRepository from '../../domain/auth.repository';
import { SignInForm } from './sign-in-form';
import { SignUpForm } from './sign-up-form';

export type LoginProps = {
	repository: AuthRepository,
	onAuth: (accessToken: string) => void,
}

export const Auth: FC<LoginProps> = ({ repository, onAuth }) => {
	const onIdToken = (idToken: string) => {
		repository.authFirebase(idToken).then(onAuth)
	}

	return (
		<>
			<GoogleLoginButton onIdToken={onIdToken} />
			<hr/>
			<SignUpForm onIdToken={onIdToken} />
			<hr/>
			<SignInForm onIdToken={onIdToken} />
		</>
	)
}
