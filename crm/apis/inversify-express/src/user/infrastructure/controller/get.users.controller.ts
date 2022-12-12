import { Request, Response } from 'express';

import { HttpController } from '../../../shared/container/decorators';
import Controller from '../../../shared/controller';
import ListUsers from '../../application/list-users';

@HttpController()
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
