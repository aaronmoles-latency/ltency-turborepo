import { DateValueObject } from '../../value-object';

export class EventOccurredOn extends DateValueObject {
	static now() {
		return new EventOccurredOn(new Date());
	}
}
