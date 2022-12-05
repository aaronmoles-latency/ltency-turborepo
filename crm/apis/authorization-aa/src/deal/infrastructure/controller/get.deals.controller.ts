import { Request, Response } from 'express';

import Controller from '../../../shared/controller';
import { GetController } from '../../../shared/decorators/controller.decorator';
import ListDeals from '../../application/list-deals';

@GetController('/deal')
export default class GetDealsController implements Controller {
	constructor(
		private readonly listDeals: ListDeals,
	) {
	}

	async run(req: Request, res: Response): Promise<void> {
		const deals = await this.listDeals.execute()

		res.json(deals);
	}
}
