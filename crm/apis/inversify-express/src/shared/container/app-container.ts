import {
	Provider,
	ProviderType,
} from './provider.types';

export interface AppContainer {
	register(provider: Provider): void;
	get<T>(id: ProviderType): T;
}
