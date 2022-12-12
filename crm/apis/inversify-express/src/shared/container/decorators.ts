import { inject } from 'inversify';

import { ProviderType } from './provider.types';

export const Inject = (providerType: ProviderType) => inject(providerType);

const Service = (): ClassDecorator => {
	return <TFunction extends Function>(target: TFunction): TFunction => {
		return target;
	};
};

export const UseCase = Service;
export const Repository = Service;
export const HttpController = Service;
