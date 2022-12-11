import { Container } from 'inversify';

import { AppContainer } from './app-container';
import {
	getProviderId,
	isClassProvider, isFactoryProvider,
	isValueProvider,
	Provider,
	ProviderType,
} from './provider.types';

export default class InversifyAppContainer implements AppContainer {
	private readonly container: Container;

	constructor() {
		this.container = new Container({
			skipBaseClassChecks: true,
			defaultScope: 'Transient',
			autoBindInjectable: true,
		})
	}

	register(provider: Provider) {
		console.warn('-> Register ');
		// if (!this.container.isBound(getProviderId(provider))) {
		if (isClassProvider(provider)) {
			this.container.bind(provider.provide).to(provider.useClass)
		} else if (isValueProvider(provider)) {
			// console.warn(`Register ${provider.provide.toString()}`);
			this.container.bind(getProviderId(provider)).toConstantValue(provider.useValue)
		} else if (isFactoryProvider(provider)) {
			// console.warn(`Register ${provider.provide.toString()}`);
			this.container.bind(getProviderId(provider)).toFactory(() => provider.useFactory(this))
		} else {
			// console.warn(`Register ${provider.name}`);
			this.container.bind(getProviderId(provider)).toSelf()
		}
		// }
	}

	get<T>(id: ProviderType): T {
		console.warn('-> get ', id);
		return this.container.get(id);
	}
}
