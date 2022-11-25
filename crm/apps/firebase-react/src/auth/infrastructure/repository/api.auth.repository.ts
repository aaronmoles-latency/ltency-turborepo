import AuthRepository from '../../domain/auth.repository';

export default class ApiAuthRepository implements AuthRepository {
	async authFirebase(idToken: string): Promise<string> {
		return fetch('http://localhost:3000/auth/firebase', {
			method: 'POST',
			body: JSON.stringify({ idToken }),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		})
			.then((response) => response.json())
			.then((response) => response.accessToken);
	}
}
