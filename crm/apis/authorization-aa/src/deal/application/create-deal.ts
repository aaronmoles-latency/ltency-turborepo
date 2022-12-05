import { Service } from '../../shared/decorators/service.decorator';
import Deal from '../domain/deal';
import { DealRepository } from '../domain/deal.repository';
import DealAlias from '../domain/deal-alias';
import DealFee from '../domain/deal-fee';
import DealId from '../domain/deal-id';
import DealName from '../domain/deal-name';

@Service()
export default class CreateDeal {
	constructor(
		private readonly dealRepository: DealRepository,
	) {
	}

	async execute(
		id: string,
		name: string,
		alias: string,
		fee: number,
	): Promise<void> {
		const deal = new Deal(
			new DealId(id),
			new DealName(name),
			new DealAlias(alias),
			new DealFee(fee),
		)
		await this.dealRepository.save(deal)
	}
}
