import { StringValueObject } from '@latency/domain';

export default class DealName extends StringValueObject {
	constructor(value: string) {
		super(value);
	}
}
