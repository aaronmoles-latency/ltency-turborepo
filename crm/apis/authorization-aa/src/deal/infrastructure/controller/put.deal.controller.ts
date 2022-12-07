import { Request, Response } from 'express';
import httpStatus from 'http-status';

import PolicyFactory from '../../../auth/domain/policy.factory';
import Controller from '../../../shared/controller';
import { PutController } from '../../../shared/decorators/controller.decorator';
import CreateDeal from '../../application/create-deal';
import CreateDealCommand from '../../application/create-deal.command';

type PutDealControllerRequest = Request<{id: string}, void, {name: string, alias: string, fee: number}>

@PutController('/deal/:id')
export default class PutDealController implements Controller {
	constructor(
		private readonly createDeal: CreateDeal,
	) {
	}

	async run(req: PutDealControllerRequest, res: Response): Promise<void> {
		const userPolicy = PolicyFactory.createUser();
		const command = new CreateDealCommand(
			req.params.id,
			req.body.name,
			req.body.alias,
			req.body.fee,
			userPolicy,
		)
		await this.createDeal.execute(command)

		res.status(httpStatus.CREATED).send();
	}
}
