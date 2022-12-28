import 'reflect-metadata';

import { Container, ContainerBuilder } from 'diod';

import { AppContainer } from './app-container';
import {
	getProviderId,
	isClassProvider, isControllerProvider,
	isFactoryProvider, isInstanceProvider,
	Provider,
	ProviderType,
} from './config';

export class DiodAppContainer implements AppContainer {
	private readonly container: Container;

	constructor(providers: Provider<unknown>[]) {
		const builder = new ContainerBuilder();

		providers.forEach((provider) => {
			this.register(builder, provider)
		})

		this.container = builder.build();
	}

	get<T>(id: ProviderType<T>): T {
		return this.container.get(id);
	}

	private register(builder: ContainerBuilder, provider: Provider<unknown>): void {
		if (isClassProvider(provider)) {
			builder.register(provider.provide).use(provider.useClass)
		} else if (isFactoryProvider(provider)) {
			builder.register(getProviderId(provider)).useFactory(() => provider.useFactory(this))
		} else if (isControllerProvider(provider)) {
			builder.registerAndUse(provider.useClass)
		} else if (isInstanceProvider(provider)) {
			builder.register(getProviderId(provider)).useInstance(provider.useInstance)
		} else {
			builder.registerAndUse(provider)
		}
	}
}
