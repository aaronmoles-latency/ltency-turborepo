import { UseCaseParams } from './UseCaseParams';

export class SecuredUseCaseParams<T extends Record<string, unknown>> extends UseCaseParams<T> {
	constructor(props: T, readonly user: string){
		super(props);
	}
}
