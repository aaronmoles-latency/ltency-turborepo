import { Request, Response } from 'express';

import PolicyFactory from '../../../auth/domain/policy.factory';
import Controller from '../../../shared/controller';
import { GetController } from '../../../shared/decorators/controller.decorator';
import DetailDeal from '../../application/detail-deal';
import DetailDealQuery from '../../application/detail-deal.query';

type GetDealControllerRequest = Request<{id: string}>

@GetController('/deal/:id')
export default class GetDealController implements Controller {
	constructor(
		private readonly detailDeal: DetailDeal,
	) {
	}

	async run(req: GetDealControllerRequest, res: Response): Promise<void> {
		const userPolicy = PolicyFactory.createUser();
		const query = new DetailDealQuery(req.params.id, userPolicy)
		const deal = await this.detailDeal.execute(query)

		res.json(deal);
	}
}
