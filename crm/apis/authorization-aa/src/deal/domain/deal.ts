import { AggregateRoot } from '@latency/domain';

import DealAlias from './deal-alias';
import DealFee from './deal-fee';
import DealId from './deal-id';
import DealName from './deal-name';

export default class Deal extends AggregateRoot {
	constructor(
		private readonly _id: DealId,
		private readonly _name: DealName,
		private readonly _alias: DealAlias,
		private readonly _fee: DealFee,
	) {
		super();
	}

	get id(): DealId {
		return this._id;
	}

	get name(): DealName {
		return this._name;
	}

	get alias(): DealAlias {
		return this._alias;
	}

	get fee(): DealFee {
		return this._fee;
	}
}
