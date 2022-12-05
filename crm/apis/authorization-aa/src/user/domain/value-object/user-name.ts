import { StringValueObject } from '@latency/domain';

export default class UserName extends StringValueObject {
	constructor(value: string) {
		super(value);
	}
}
