import {
	Event,
	EventAttributes,
	EventId,
	EventMeta,
	EventName,
	EventOccurredOn,
} from '@latency/domain';

export class Command<A> extends Event<A> {
	constructor(
		name: EventName,
		attributes: EventAttributes<A>,
	) {
		super(
			EventId.create(),
			name,
			EventOccurredOn.now(),
			attributes,
			EventMeta.empty(),
		)
	}
}
