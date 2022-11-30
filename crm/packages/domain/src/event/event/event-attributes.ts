export class EventAttributes<T = Record<string, never>> {
	static empty() {
		return new EventAttributes({});
	}

	constructor(private readonly value: T) {
	}

	set(key: keyof T, value: T[keyof T]): void {
		this.value[key] = value;
	}

	get(key: keyof T): T[keyof T] {
		return this.value[key];
	}
}
