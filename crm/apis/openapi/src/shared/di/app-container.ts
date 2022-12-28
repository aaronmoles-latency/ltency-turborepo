import { ProviderType } from './config';

export interface AppContainer {
	get<T>(id: ProviderType<T>): T;
}
