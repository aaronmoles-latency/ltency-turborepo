import { StringValueObject } from '../../shared/domain/value-object/string.value-object';

export default class UserName extends StringValueObject {
	constructor(value: string) {
		super(value);
	}
}
