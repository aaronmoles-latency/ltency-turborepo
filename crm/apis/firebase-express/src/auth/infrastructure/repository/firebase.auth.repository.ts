import { credential, ServiceAccount } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import serviceAccount from '../../../../firebase-service-account.json';
import Auth from '../../domain/auth';
import { AuthRepository } from '../../domain/auth.repository';

export default class FirebaseAuthRepository implements AuthRepository {
	constructor() {
		initializeApp({
			credential: credential.cert(serviceAccount as ServiceAccount),
		});
	}

	async getAuth(token: string): Promise<Auth> {
		const firebaseAuth = getAuth();
		const decodedIdToken = await firebaseAuth.verifyIdToken(token)
		const user = await firebaseAuth.getUser(decodedIdToken.uid)
		return new Auth(user.uid, user.email!)
	}
}
