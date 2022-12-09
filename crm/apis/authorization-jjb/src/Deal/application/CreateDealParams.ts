import { SecuredUseCaseParams } from '../../shared/SecuredUseCaseParams';

type Props = {
	id: string,
	name: string,
	fee: number
}

export class CreateDealParams extends SecuredUseCaseParams<Props> {
}
