import { inject, injectable } from 'inversify';

import { ProviderType } from './provider.types';

export const Inject = (providerType: ProviderType) => inject(providerType);

export const Service = injectable;
export const UseCase = injectable;
export const Repository = injectable;
