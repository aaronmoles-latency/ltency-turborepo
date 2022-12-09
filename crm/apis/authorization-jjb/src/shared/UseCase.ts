import { UseCaseParams } from './UseCaseParams';

export abstract class UseCase<T extends Record<string, unknown>> {
	abstract run(params: UseCaseParams<T>): Promise<void>;
}
