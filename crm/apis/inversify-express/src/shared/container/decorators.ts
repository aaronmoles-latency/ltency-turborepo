import { inject } from 'inversify';

import { ProviderType } from './provider.types';

export const Inject = (providerType: ProviderType) => inject(providerType);

export const Service = (): ClassDecorator => {
	return <TFunction extends Function>(target: TFunction): TFunction => {
		return target;
	};
};
export const UseCase = (): ClassDecorator => {
	return <TFunction extends Function>(target: TFunction): TFunction => {
		return target;
	};
};
export const Repository = (): ClassDecorator => {
	return <TFunction extends Function>(target: TFunction): TFunction => {
		return target;
	};
};
// export const Service = injectable;
// export const UseCase = injectable;
// export const Repository = injectable;
