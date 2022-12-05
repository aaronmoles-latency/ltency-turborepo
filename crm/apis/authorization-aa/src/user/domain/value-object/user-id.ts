import { Uuid } from '@latency/domain';

export default class UserId extends Uuid {
	constructor(value: string) {
		super(value);
	}
}
