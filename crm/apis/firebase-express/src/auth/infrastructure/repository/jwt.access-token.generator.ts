import jwt from 'jsonwebtoken';

import { AccessTokenGenerator } from '../../domain/access-token.generator';
import Auth from '../../domain/auth';

export default class JwtAccessTokenGenerator implements AccessTokenGenerator {
	async generate(auth: Auth): Promise<string> {
		return jwt.sign({
			id: auth.id,
			email: auth.email,
		}, 'secret')
	}
}
