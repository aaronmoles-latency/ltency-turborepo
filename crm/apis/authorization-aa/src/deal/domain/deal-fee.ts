import { NumberValueObject } from '@latency/domain';

export default class DealFee extends NumberValueObject {
	constructor(value: number) {
		super(value);
	}
}
