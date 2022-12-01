import { PrimitiveType } from '@latency/core';

import { InvalidArgumentError } from '../error';

export abstract class ValueObject<T extends PrimitiveType> {
	private readonly _value: T;

	constructor(value: T) {
		this._value = value;
		this.ensureValueIsDefined(value);
	}

	private ensureValueIsDefined(value: T): void {
		if (value === null || value === undefined) {
			throw new InvalidArgumentError('Value must be defined');
		}
	}

	get value(): T {
		return this._value;
	}

	equals(other: ValueObject<T>): boolean {
		return other.constructor.name === this.constructor.name && other._value === this._value;
	}

	toString(): string {
		return this._value.toString();
	}
}
