import { Container, decorate, injectable } from 'inversify';

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
		if (isClassProvider(provider)) {
			decorate(injectable(), provider.useClass)
			this.container.bind(provider.provide).to(provider.useClass)
		} else if (isValueProvider(provider)) {
			this.container.bind(getProviderId(provider)).toConstantValue(provider.useValue)
		} else if (isFactoryProvider(provider)) {
			this.container.bind(getProviderId(provider)).toFactory(() => provider.useFactory(this))
		} else {
			decorate(injectable(), provider)
			this.container.bind(getProviderId(provider)).toSelf()
		}
		// }
	}

	get<T>(id: ProviderType): T {
		console.warn('-> get ', id);
		return this.container.get(id);
	}
}
