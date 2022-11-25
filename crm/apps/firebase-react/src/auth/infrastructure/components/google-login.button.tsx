import React, { FC } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from "../../../firebase-config.json"

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export const GoogleLoginButton: FC<{onIdToken: (idToken: string) => void}> = ({onIdToken}) => {
	const handleGoogleLogin = () => {
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({
			'login_hint': 'user@latencydata.com'
		});

		signInWithPopup(firebaseAuth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				const user = result.user;
				console.warn({ token, user});
				user.getIdToken().then(onIdToken)
			}).catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
				console.error({ errorCode, errorMessage, email });
			});
	}
	return (
		<>
			<button onClick={handleGoogleLogin}>LOGIN WITH GOOGLE</button>
		</>
	)
}
