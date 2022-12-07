import Authorizer from '../../auth/application/authorizer';
import { QueryHandler } from '../../shared/cqrs/domain/query/query-handler';
import { Service } from '../../shared/decorators/service.decorator';
import { dealAdapter } from '../domain/deal.adapter';
import DealDto from '../domain/deal.dto';
import { DealRepository } from '../domain/deal.repository';
import DealId from '../domain/deal-id';
import DetailDealQuery from './detail-deal.query';

@Service()
export default class DetailDeal extends QueryHandler<DetailDealQuery, DealDto>{
	constructor(
		private readonly dealRepository: DealRepository,
		private readonly authorizer: Authorizer,
	) {
		super(DetailDealQuery)
	}

	async handle({ id, __name, userPolicy }: DetailDealQuery): Promise<DealDto> {
		await this.authorizer.grant(
			__name,
			userPolicy,
		)

		const dealId = new DealId(id)
		const deal = await this.dealRepository.findOne(dealId)
		if (!deal) {
			throw new Error(`Deal ${id} not found`)
		}
		return dealAdapter(deal);
	}
}
