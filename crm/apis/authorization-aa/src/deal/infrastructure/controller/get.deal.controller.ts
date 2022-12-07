import { Request, Response } from 'express';

import PolicyFactory from '../../../auth/domain/policy.factory';
import Controller from '../../../shared/controller';
import { QueryBus } from '../../../shared/cqrs/domain/query/query-bus';
import { GetController } from '../../../shared/decorators/controller.decorator';
import DetailDealQuery from '../../application/detail-deal.query';
import DealDto from '../../domain/deal.dto';

type GetDealControllerRequest = Request<{id: string}>

@GetController('/deal/:id')
export default class GetDealController implements Controller {
	constructor(
		private readonly queryBus: QueryBus,
	) {
	}

	async run(req: GetDealControllerRequest, res: Response): Promise<void> {
		const userPolicy = PolicyFactory.createUser();
		const query = new DetailDealQuery(req.params.id, userPolicy)
		const deal = await this.queryBus.ask<DealDto>(query)

		res.json(deal);
	}
}
