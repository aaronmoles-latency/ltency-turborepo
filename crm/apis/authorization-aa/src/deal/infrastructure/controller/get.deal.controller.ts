import { Request, Response } from 'express';

import Controller from '../../../shared/controller';
import { GetController } from '../../../shared/decorators/controller.decorator';
import DetailDeal from '../../application/detail-deal';

type GetDealControllerRequest = Request<{id: string}>

@GetController('/deal/:id')
export default class GetDealController implements Controller {
	constructor(
		private readonly detailDeal: DetailDeal,
	) {
	}

	async run(req: GetDealControllerRequest, res: Response): Promise<void> {
		const deal = await this.detailDeal.execute(req.params.id)

		res.json(deal);
	}
}
