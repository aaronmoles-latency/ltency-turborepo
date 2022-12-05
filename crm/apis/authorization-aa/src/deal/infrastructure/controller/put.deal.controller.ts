import { Request, Response } from 'express';
import httpStatus from 'http-status';

import Controller from '../../../shared/controller';
import { PutController } from '../../../shared/decorators/controller.decorator';
import CreateDeal from '../../application/create-deal';

type PutDealControllerRequest = Request<{id: string}, void, {name: string, alias: string, fee: number}>

@PutController('/deal/:id')
export default class PutDealController implements Controller {
	constructor(
		private readonly createDeal: CreateDeal,
	) {
	}

	async run(req: PutDealControllerRequest, res: Response): Promise<void> {
		await this.createDeal.execute(
			req.params.id,
			req.body.name,
			req.body.alias,
			req.body.fee,
		)

		res.status(httpStatus.CREATED).send();
	}
}
