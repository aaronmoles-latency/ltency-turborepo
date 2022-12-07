import Authorizer from '../../auth/application/authorizer';
import { Service } from '../../shared/decorators/service.decorator';
import { CommandService } from '../../shared/use-case/service';
import Deal from '../domain/deal';
import { DealRepository } from '../domain/deal.repository';
import DealAlias from '../domain/deal-alias';
import DealFee from '../domain/deal-fee';
import DealId from '../domain/deal-id';
import DealName from '../domain/deal-name';
import CreateDealCommand from './create-deal.command';

@Service()
export default class CreateDeal implements CommandService<CreateDealCommand>{
	constructor(
		private readonly dealRepository: DealRepository,
		private readonly authorizer: Authorizer,
	) {
	}

	async execute({ id, name, alias, fee, userPolicy, __name }: CreateDealCommand): Promise<void> {
		await this.authorizer.grant(
			__name,
			userPolicy,
		)

		const deal = new Deal(
			new DealId(id),
			new DealName(name),
			new DealAlias(alias),
			new DealFee(fee),
		)
		await this.dealRepository.save(deal)
	}
}
