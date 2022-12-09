import { QueryHandler } from '../../shared/cqrs/domain/query/query-handler';
import { SecureService } from '../../shared/decorators/service.decorator';
import { dealAdapter } from '../domain/deal.adapter';
import DealDto from '../domain/deal.dto';
import { DealRepository } from '../domain/deal.repository';
import DealId from '../domain/deal-id';
import DetailDealQuery from './detail-deal.query';

// @Service()
@SecureService()
export default class DetailDeal extends QueryHandler<DetailDealQuery, DealDto>{
	constructor(
		private readonly dealRepository: DealRepository,
	) {
		super(DetailDealQuery)
	}

	async handle({ id }: DetailDealQuery): Promise<DealDto> {
		const dealId = new DealId(id)
		const deal = await this.dealRepository.findOne(dealId)
		if (!deal) {
			throw new Error(`Deal ${id} not found`)
		}
		return dealAdapter(deal);
	}
}
