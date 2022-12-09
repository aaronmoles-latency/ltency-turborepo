export class EventAttributes<T = Record<string, never>> {
	static empty() {
		return new EventAttributes({});
	}

	constructor(private readonly _value: T) {
	}

	get value(): T {
		return this._value;
	}

	set(key: keyof T, value: T[keyof T]): void {
		this._value[key] = value;
	}

	get(key: keyof T): T[keyof T] {
		return this._value[key];
	}
}
