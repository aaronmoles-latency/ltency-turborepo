import { Request, Response } from 'express';
import { injectable } from 'inversify';

import Controller from '../../../shared/controller';
import { GetController } from '../../../shared/decorators/controller.decorator';
import ListUsers from '../../application/list-users';

@GetController('/user')
@injectable()
export default class GetUsersController implements Controller {
	constructor(
		private readonly listUsers: ListUsers,
	) {
	}

	async run(req: Request, res: Response): Promise<void> {
		const users = await this.listUsers.execute()

		res.json(users);
	}
}
