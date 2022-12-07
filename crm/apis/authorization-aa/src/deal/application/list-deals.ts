import { QueryHandler } from '../../shared/cqrs/domain/query/query-handler';
import { Service } from '../../shared/decorators/service.decorator';
import { dealAdapter } from '../domain/deal.adapter';
import DealDto from '../domain/deal.dto';
import { DealRepository } from '../domain/deal.repository';
import ListDealsQuery from './list-deals.query';

@Service()
export default class ListDeals extends QueryHandler<ListDealsQuery, DealDto[]> {
	constructor(
		private readonly dealRepository: DealRepository,
	) {
		super(ListDealsQuery)
	}

	async handle({}: ListDealsQuery): Promise<DealDto[]> {
		return this.dealRepository.findAll()
			.then((deals) => deals.map(dealAdapter))
			// .then((deals) => deals.map(authAdapter<DealDto>(policy)))
	}
}
