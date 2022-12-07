import { Request, Response } from 'express';

import PolicyFactory from '../../../auth/domain/policy.factory';
import Controller from '../../../shared/controller';
import { QueryBus } from '../../../shared/cqrs/domain/query/query-bus';
import { GetController } from '../../../shared/decorators/controller.decorator';
import ListDealsQuery from '../../application/list-deals.query';
import DealDto from '../../domain/deal.dto';

@GetController('/deal')
export default class GetDealsController implements Controller {
	constructor(
		private readonly queryBus: QueryBus,
	) {
	}

	async run(req: Request, res: Response): Promise<void> {
		const userPolicy = PolicyFactory.createUser();
		const query = new ListDealsQuery(userPolicy)
		const deals = await this.queryBus.ask<DealDto[]>(query)

		res.json(deals);
	}
}
