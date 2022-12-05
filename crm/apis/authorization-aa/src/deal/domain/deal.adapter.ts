import { Adapter } from '@latency/core';

import Deal from './deal';
import DealDto from './deal.dto';

export const dealAdapter = Adapter<Deal, DealDto>((deal) => ({
	id: deal.id.value,
	name: deal.name.value,
	alias: deal.alias.value,
	fee: deal.fee.value,
}))
