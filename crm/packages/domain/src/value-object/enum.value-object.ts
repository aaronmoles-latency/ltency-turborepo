export abstract class EnumValueObject<T> {
	private readonly _value: T;

	protected constructor(value: T, public readonly validValues: T[]) {
		this._value = value;
		this.checkValueIsValid(value);
	}

	public checkValueIsValid(value: T): void {
		if (!this.validValues.includes(value)) {
			this.throwErrorForInvalidValue(value);
		}
	}

	get value(): T {
		return this._value;
	}

	equals(other: EnumValueObject<T>): boolean {
		return other.constructor.name === this.constructor.name && other._value === this._value;
	}

	protected abstract throwErrorForInvalidValue(value: T): void;
}
