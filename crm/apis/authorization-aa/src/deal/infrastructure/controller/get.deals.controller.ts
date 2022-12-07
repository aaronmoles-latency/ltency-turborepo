import { Request, Response } from 'express';

import PolicyFactory from '../../../auth/domain/policy.factory';
import Controller from '../../../shared/controller';
import { GetController } from '../../../shared/decorators/controller.decorator';
import ListDeals from '../../application/list-deals';
import ListDealsQuery from '../../application/list-deals.query';

@GetController('/deal')
export default class GetDealsController implements Controller {
	constructor(
		private readonly listDeals: ListDeals,
	) {
	}

	async run(req: Request, res: Response): Promise<void> {
		const userPolicy = PolicyFactory.createUser();
		const query = new ListDealsQuery(userPolicy)
		const deals = await this.listDeals.execute(query)

		res.json(deals);
	}
}
