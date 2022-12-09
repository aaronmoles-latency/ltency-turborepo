import { Notation } from 'notation';

//This is just an example of use, we wouldn't call/import this class directly
import { PolicyByUser } from '../Authorization/application/GetPolicy';
import { Operation } from './Operation';
import { SecuredUseCaseParams } from './SecuredUseCaseParams';
import { UseCase } from './UseCase';

export abstract class SecuredUseCase<T extends Record<string, unknown>> extends UseCase<T> {
	async run({ props, user }: SecuredUseCaseParams<T>): Promise<void> {
		const policy = await (new PolicyByUser().run(user, this.domain()));
		const columnsGranted = policy.columnsGranted(this.operation(), Object.keys(props))
		if (columnsGranted?.length){
			const columns = Notation.create(props).filter(columnsGranted).value;
			return this.runSecured(columns);
		}
	}

	protected abstract runSecured(props: T): Promise<void>;

	protected abstract operation(): Operation;

	protected abstract domain(): string;
}
