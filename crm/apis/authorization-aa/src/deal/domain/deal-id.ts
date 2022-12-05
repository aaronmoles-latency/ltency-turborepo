import { Uuid } from '@latency/domain';

export default class DealId extends Uuid {
	constructor(value: string) {
		super(value);
	}
}
