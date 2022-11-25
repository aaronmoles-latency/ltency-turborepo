import React, { FC, useState } from 'react';
import firebaseConfig from "../../../firebase-config.json"
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export const SignUpForm: FC<{onIdToken: (idToken: string) => void}> = ({onIdToken}) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const onSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		createUserWithEmailAndPassword(firebaseAuth, email, password)
			.then((userCredential) => userCredential.user.getIdToken())
			.then(onIdToken)
			.catch((error) => alert(error.message))
	}

	return (
		<>
			<h1>Registro</h1>
			<form onSubmit={onSubmit}>
				<input type={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
				<button type={'submit'}>REGISTER</button>
			</form>
		</>
	)
}
