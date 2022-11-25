import { AccessTokenGenerator } from '../../../src/auth/domain/access-token.generator';
import Auth from '../../../src/auth/domain/auth';

export default class MockAccessTokenGenerator implements AccessTokenGenerator {
	async generate(auth: Auth): Promise<string> {
		return Buffer.from(Math.random().toString()).toString('base64');
	}
}
