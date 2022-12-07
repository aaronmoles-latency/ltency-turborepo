import Authorizer from '../../auth/application/authorizer';
import { Service } from '../../shared/decorators/service.decorator';
import { QueryService } from '../../shared/use-case/service';
import { dealAdapter } from '../domain/deal.adapter';
import DealDto from '../domain/deal.dto';
import { DealRepository } from '../domain/deal.repository';
import ListDealsQuery from './list-deals.query';

@Service()
export default class ListDeals implements QueryService<ListDealsQuery, DealDto[]> {
	constructor(
		private readonly dealRepository: DealRepository,
		private readonly authService: Authorizer,
	) {
	}

	async execute({ __name, userPolicy }: ListDealsQuery): Promise<DealDto[]> {
		await this.authService.grant(
			__name,
			userPolicy,
		)

		return this.dealRepository.findAll()
			.then((deals) => deals.map(dealAdapter))
			// .then((deals) => deals.map(authAdapter<DealDto>(policy)))
	}
}
