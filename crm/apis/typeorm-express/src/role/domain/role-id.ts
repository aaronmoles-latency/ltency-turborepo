import { Uuid } from '@latency/domain';

export default class RoleId extends Uuid {
	constructor(value: string) {
		super(value);
	}
}
