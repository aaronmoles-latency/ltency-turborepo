/* eslint-disable no-console */

import { Service } from '../../shared/decorators/service.decorator';
import { Operation } from '../../shared/Operation';
import { SecuredUseCase } from '../../shared/SecuredUseCase';
import { Deal } from '../domain/Deal';
import type { DealRepository } from '../domain/DealRepository';
import { CreateDealParams } from './CreateDealParams';

@Service()
export class DealCreator extends SecuredUseCase<CreateDealParams['props']>{
	constructor(private readonly dealRepository: DealRepository) {
		super()
	}

	protected async runSecured({ id, name, fee }: CreateDealParams['props']): Promise<void> {
		console.log('Params received', { id, name, fee });
		await this.dealRepository.create(new Deal(id, name, fee));
	}

	protected operation(): Operation {
		return Operation.CREATE;
	}

	protected domain(): string {
		return 'deal';
	}
}
