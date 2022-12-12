import { Request, Response } from 'express';
import httpStatus from 'http-status'

import { HttpController } from '../../../shared/container/decorators';
import Controller from '../../../shared/controller';
import UserUpdater from '../../application/user-updater';

@HttpController()
export default class PutUserController implements Controller {
	constructor(
		private readonly userUpdater: UserUpdater,
	) {
	}

	async run(req: Request<{id: string}, { name: string, roleId: string }>, res: Response): Promise<void> {
		const id = req.params['id'];
		const name = req.body.name;
		const roleId = req.body.roleId;

		await this.userUpdater.execute(id, name, roleId)

		res.status(httpStatus.CREATED).send();
	}
}
