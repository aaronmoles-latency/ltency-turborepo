import Auth from './auth';

export abstract class AccessTokenGenerator {
	abstract generate(auth: Auth): Promise<string>;
}
