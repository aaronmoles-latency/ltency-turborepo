import { EventId, EventName } from '@latency/domain';

export class Query {
	constructor(
		private readonly ___name: EventName,
		private readonly ___id: EventId = EventId.create(),
	) {
	}

	get __name(): EventName {
		return this.___name;
	}

	get __id(): EventId {
		return this.___id;
	}
}
