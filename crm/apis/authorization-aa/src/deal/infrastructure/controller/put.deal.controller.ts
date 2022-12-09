import { Request, Response } from 'express';
import httpStatus from 'http-status';

import PolicyFactory from '../../../auth/domain/policy.factory';
import Controller from '../../../shared/controller';
import { CommandBus } from '../../../shared/cqrs/domain/command/command-bus';
import { PutController } from '../../../shared/decorators/controller.decorator';
import CreateDealCommand from '../../application/create-deal.command';

type PutDealControllerRequest = Request<{id: string}, void, {name: string, alias: string, fee: number}>

@PutController('/deal/:id')
export default class PutDealController implements Controller {
	constructor(
		private readonly commandBus: CommandBus,
	) {
	}

	async run(req: PutDealControllerRequest, res: Response): Promise<void> {
		const userPolicy = PolicyFactory.createUser();
		const command = new CreateDealCommand(
			{
				id: req.params.id,
				name: req.body.name,
				alias: req.body.alias,
				fee: req.body.fee,
			},
			userPolicy,
		)
		await this.commandBus.dispatch(command)

		res.status(httpStatus.CREATED).send();
	}
}
