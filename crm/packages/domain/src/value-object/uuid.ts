import { v4 as uuid, validate } from 'uuid';

import { InvalidArgumentError } from '../error';
import { ValueObject } from './value-object';

export class Uuid extends ValueObject<string> {
	protected constructor(value: string) {
		super(value);
		this.ensureIsValidUuid(value);
	}

	static random() {
		return new Uuid(uuid());
	}

	private ensureIsValidUuid(id: string): void {
		if (!validate(id)) {
			throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
		}
	}
}
