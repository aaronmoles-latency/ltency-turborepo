import { Optional } from '@latency/core';

import Deal from './deal';
import DealId from './deal-id';

export abstract class DealRepository {
	abstract save(deal: Deal): Promise<void>;

	abstract findAll(): Promise<Deal[]>

	abstract findOne(dealId: DealId): Promise<Optional<Deal>>
}
