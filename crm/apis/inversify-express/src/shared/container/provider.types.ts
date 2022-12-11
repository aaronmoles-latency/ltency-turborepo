import { NewableClass } from '@latency/core';
import { AbstractClass } from '@latency/core/src/abstract-class';

import { AppContainer } from './app-container';

/* TYPES */

export type ProviderType = string | symbol | NewableClass<unknown> | AbstractClass<unknown>;

export interface ClassProvider<T = any> {
	provide: ProviderType;
	useClass: NewableClass<T>;
}

export interface ValueProvider<T = any> {
	provide: ProviderType;
	useValue: T;
}

export interface FactoryProvider<T = any> {
	provide: ProviderType;
	useFactory: (appContainer: AppContainer) => T;
}

export type Provider<T = any> = NewableClass<T> | ClassProvider<T> | ValueProvider<T> | FactoryProvider<T>;

/* TYPE PREDICATES */

export function isClassProvider(provider: Provider): provider is ClassProvider {
	return (<ClassProvider>provider).provide !== undefined && (<ClassProvider>provider).useClass !== undefined;
}

export function isValueProvider(provider: Provider): provider is ValueProvider {
	return (<ValueProvider>provider).provide !== undefined && (<ValueProvider>provider).useValue !== undefined;
}

export function isFactoryProvider(provider: Provider): provider is FactoryProvider {
	return (<FactoryProvider>provider).provide !== undefined && (<FactoryProvider>provider).useFactory !== undefined;
}

function isDefaultProvider(provider: Provider): provider is NewableClass<unknown> {
	return !isClassProvider(provider) && !isValueProvider(provider) && !isFactoryProvider(provider)
}

/* FUNCTIONS */

export function getProviderId(provider: Provider): ProviderType {
	if (isClassProvider(provider) || isValueProvider(provider) || isFactoryProvider(provider)) {
		return provider.provide
	}
	return provider;
}
