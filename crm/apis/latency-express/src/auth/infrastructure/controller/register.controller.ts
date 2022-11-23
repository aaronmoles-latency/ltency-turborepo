import { Request, Response } from 'express';
import httpStatus from 'http-status';

import Controller from '../../../shared/controller';
import { PostController } from '../../../shared/decorators/controller.decorator';
import RegisterService from '../../application/register.service';

@PostController('/auth')
export default class RegisterController implements Controller {
	constructor(
		private readonly registerService: RegisterService,
	) {
	}

	async run(req: Request, res: Response): Promise<void> {
		await this.registerService.run();
		res.status(httpStatus.CREATED).send();
	}
}
