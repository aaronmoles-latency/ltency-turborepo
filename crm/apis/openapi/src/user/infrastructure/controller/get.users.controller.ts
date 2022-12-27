import { routes } from '@autogen/routes';
import { Request, Response } from 'express';

import Controller from '../../../shared/controller';
import { GetController } from '../../../shared/decorators/controller.decorator';
import ListUsers from '../../application/list-users';

@GetController('/user')
export default class GetUsersController implements Controller<Request, Response> {
	constructor(
		private readonly listUsers: ListUsers,
	) {
	}

	async run(req: Request, res: Response): Promise<void> {
		const users = await this.listUsers.execute()
		console.log(routes.AddPet.route)
		res.json(users);
	}
}
