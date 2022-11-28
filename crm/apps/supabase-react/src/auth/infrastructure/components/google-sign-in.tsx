import { FC } from 'react';
import { useAuth } from '../../../Auth';

export const GoogleSignIn: FC<{}> = ({}) => {
	const { signInGoogle } = useAuth()

	const handleSignIn = () => {
		void signInGoogle()
	}

	return <button onClick={handleSignIn}>GOOGLE SIGN IN</button>
}
