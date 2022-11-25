import Auth from './auth';

export abstract class AuthRepository {
	abstract getAuth(token: string): Promise<Auth>;
}
