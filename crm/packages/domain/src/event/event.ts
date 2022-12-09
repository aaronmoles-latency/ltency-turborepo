import { EventAttributes } from './event/event-attributes';
import { EventId } from './event/event-id';
import { EventMeta } from './event/event-meta';
import { EventName } from './event/event-name';
import { EventOccurredOn } from './event/event-occurred-on';
import { EventType } from './event/event-type';

export abstract class Event<T = Record<string, never>> {
	constructor(
		private readonly _id: EventId,
		private readonly _name: EventName,
		private readonly _occurredOn: EventOccurredOn,
		private _attributes: EventAttributes<T>,
		private readonly _meta: EventMeta,
	) {
	}

	get id(): EventId {
		return this._id;
	}

	get name(): EventName {
		return this._name;
	}

	get occurredOn(): EventOccurredOn {
		return this._occurredOn;
	}

	get attributes(): EventAttributes<T> {
		return this._attributes;
	}

	updateAttributes(attributes: EventAttributes<T>): void {
		this._attributes = attributes;
	}

	get type(): EventType {
		return this._name.getType();
	}

	get meta(): EventMeta {
		return this._meta;
	}
}
