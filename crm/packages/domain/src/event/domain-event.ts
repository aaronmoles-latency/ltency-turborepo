import { Uuid } from '../value-object';
import { Event } from './event';
import { EventAttributes } from './event/event-attributes';
import { EventId } from './event/event-id';
import { EventMeta } from './event/event-meta';
import { EventName } from './event/event-name';
import { EventOccurredOn } from './event/event-occurred-on';

export abstract class DomainEvent<T = Record<string, never>> extends Event<T> {
	protected constructor(
		name: EventName,
		private readonly _aggregateId: Uuid,
		attributes: T,
		messageMeta: EventMeta = EventMeta.empty(),
	) {
		super(
			EventId.create(),
			name,
			EventOccurredOn.now(),
			new EventAttributes(attributes),
			messageMeta,
		);
	}
}
