import { Uuid } from '../../value-object';

export class EventId extends Uuid {
	static create(): EventId {
		return EventId.random();
	}

	constructor(value: string) {
		super(value);
	}
}
