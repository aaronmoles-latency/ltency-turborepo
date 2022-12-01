export function assertNever(value: never): never {
	throw Error(`Unexpected value '${value}'`);
}
