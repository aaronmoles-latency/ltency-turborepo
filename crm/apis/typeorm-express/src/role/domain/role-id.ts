import { Uuid } from '../../shared/domain/value-object/uuid';

export default class RoleId extends Uuid {
	constructor(value: string) {
		super(value);
	}
}
