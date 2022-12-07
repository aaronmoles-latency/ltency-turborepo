import CommandHandler from '../../shared/cqrs/domain/command/command-handler';
import { Service } from '../../shared/decorators/service.decorator';
import Deal from '../domain/deal';
import { DealRepository } from '../domain/deal.repository';
import DealAlias from '../domain/deal-alias';
import DealFee from '../domain/deal-fee';
import DealId from '../domain/deal-id';
import DealName from '../domain/deal-name';
import CreateDealCommand from './create-deal.command';

@Service()
export default class CreateDeal extends CommandHandler<CreateDealCommand>{
	constructor(
		private readonly dealRepository: DealRepository,
	) {
		super(CreateDealCommand)
	}

	async handle({ id, name, alias, fee }: CreateDealCommand): Promise<void> {
		const deal = new Deal(
			new DealId(id),
			new DealName(name),
			new DealAlias(alias),
			new DealFee(fee),
		)
		await this.dealRepository.save(deal)
	}
}
