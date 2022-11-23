import { Request, Response } from 'express';

import Controller from '../../shared/controller';
import { GetController } from '../../shared/decorators/controller.decorator';
import DashboardService from '../application/dashboard.service';

@GetController('/dashboard')
export default class DashboardController implements Controller {
	constructor(
		private readonly dashboardService: DashboardService,
	) {
	}

	async run(req: Request, res: Response): Promise<void> {
		const result = await this.dashboardService.run();
		res.json({ data: result });
	}
}
