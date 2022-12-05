import { Uuid } from '@latency/domain';

import AuthService from '../../auth/application/auth.service';
import { authAdapter } from '../../auth/domain/auth.adapter';
import AuthQuery from '../../auth/domain/auth.query';
import { AuthAction } from '../../auth/domain/auth-action';
import { Service } from '../../shared/decorators/service.decorator';
import { dealAdapter } from '../domain/deal.adapter';
import DealDto from '../domain/deal.dto';
import { DealRepository } from '../domain/deal.repository';
import DealId from '../domain/deal-id';

@Service()
export default class DetailDeal {
	constructor(
		private readonly dealRepository: DealRepository,
		private readonly authService: AuthService,
	) {
	}

	async execute(id: string): Promise<DealDto> {
		const dealId = new DealId(id)

		const policy = await this.authService.execute(
			new AuthQuery(
				Uuid.random(),
				dealId,
				AuthAction.fromString('latency.funnel.query.deal.detail'),
			),
		)
		if (policy.result !== 'GRANT') {
			throw new Error('Unauthorized')
		}

		const deal = await this.dealRepository.findOne(dealId)
		if (!deal) {
			throw new Error(`Deal ${id} not found`)
		}
		return authAdapter<DealDto>(policy)(dealAdapter(deal));
	}
}
