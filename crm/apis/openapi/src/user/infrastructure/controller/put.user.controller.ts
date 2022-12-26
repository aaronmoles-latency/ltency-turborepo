import { Request, Response } from 'express';
import httpStatus from 'http-status'

import Controller from '../../../shared/controller';
import { PutController } from '../../../shared/decorators/controller.decorator';
import UserUpdater from '../../application/user-updater';

type PathParams = {id: string}
type QueryParams = {limit: string}
type BodyRequest = { name: string, roleId: string }
type PutUserRequest = Request<PathParams, Record<string, never>, BodyRequest, QueryParams>
type PutUserResponse = Response<Record<string, never>>
type PutUserControllerDefinition = Controller<PutUserRequest, PutUserResponse>

@PutController('/user/:id')
export default class PutUserController implements PutUserControllerDefinition {
	constructor(
		private readonly userUpdater: UserUpdater,
	) {
	}

	async run(req: PutUserRequest, res: PutUserResponse): Promise<void> {
		const id = req.params['id'];
		const name = req.body.name;
		const roleId = req.body.roleId;

		await this.userUpdater.execute(id, name, roleId)

		res.status(httpStatus.CREATED).send();
	}
}
