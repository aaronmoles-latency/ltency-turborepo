import { Request, Response } from 'express';

import Controller from '../../../shared/controller';
import { PostController } from '../../../shared/decorators/controller.decorator';
import AuthFirebaseAuthenticator from '../../application/auth-firebase.authenticator';

@PostController('/auth/firebase')
export default class AuthFirebaseController implements Controller {
	constructor(
		private readonly authFirebaseAuthenticator: AuthFirebaseAuthenticator,
	) {
	}

	async run(req: Request, res: Response): Promise<void> {
		const token = req.body.idToken;
		const jwt = await this.authFirebaseAuthenticator.run(token);
		res.json({ accessToken: jwt });
	}
}
