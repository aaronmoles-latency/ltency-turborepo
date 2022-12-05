import { Uuid } from '@latency/domain';

import AuthService from '../../auth/application/auth.service';
import { authAdapter } from '../../auth/domain/auth.adapter';
import AuthQuery from '../../auth/domain/auth.query';
import { AuthAction } from '../../auth/domain/auth-action';
import { Service } from '../../shared/decorators/service.decorator';
import { dealAdapter } from '../domain/deal.adapter';
import DealDto from '../domain/deal.dto';
import { DealRepository } from '../domain/deal.repository';

@Service()
export default class ListDeals {
	constructor(
		private readonly dealRepository: DealRepository,
		private readonly authService: AuthService,
	) {
	}

	async execute(): Promise<DealDto[]> {
		const policy = await this.authService.execute(
			new AuthQuery(
				Uuid.random(),
				undefined,
				AuthAction.fromString('latency.funnel.query.deal.list'),
			),
		)
		if (policy.result !== 'GRANT') {
			throw new Error('Unauthorized')
		}

		return this.dealRepository.findAll()
			.then((deals) => deals.map(dealAdapter))
			.then((deals) => deals.map(authAdapter<DealDto>(policy)))
	}
}
