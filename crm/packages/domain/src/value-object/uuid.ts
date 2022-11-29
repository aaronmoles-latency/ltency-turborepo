import { v4 as uuid, validate } from 'uuid';

import { NewableClass } from '../core';
import { InvalidArgumentError } from './invalid-argument.error';
import { ValueObject } from './value-object';

export abstract class Uuid extends ValueObject<string> {
	protected constructor(value: string) {
		super(value);
		this.ensureIsValidUuid(value);
	}

	static random(): Uuid {
		return new (this.constructor as NewableClass<Uuid>)(uuid());
	}

	private ensureIsValidUuid(id: string): void {
		if (!validate(id)) {
			throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
		}
	}
}
