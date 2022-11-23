import { Request, Response } from 'express';

import Controller from '../../../shared/controller';
import { GetController } from '../../../shared/decorators/controller.decorator';
import AuthService from '../../application/auth.service';

@GetController('/auth')
export default class AuthController implements Controller {
	constructor(
		private readonly authService: AuthService,
	) {
	}

	async run(req: Request, res: Response): Promise<void> {
		const result = await this.authService.run();
		res.json({ data: result });
	}
}
