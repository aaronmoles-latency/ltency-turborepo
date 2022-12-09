export class UseCaseParams<T extends Record<string, unknown>> {
	constructor(readonly props: T){}
}
