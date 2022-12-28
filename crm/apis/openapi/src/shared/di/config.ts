import { NewableClass } from '@latency/core';
import { AbstractClass } from '@latency/core/src/abstract-class';

import { AppContainer } from './app-container';

export type ProviderType<T> = NewableClass<T> | AbstractClass<T>;

export interface ClassProvider<T = any> {
	provide: ProviderType<T>;
	useClass: NewableClass<T>;
}

export interface InstanceProvider<T = any> {
	provide: ProviderType<T>;
	useInstance: T;
}

export interface ControllerProvider<T = any> {
	method: string;
	route: string,
	useClass: NewableClass<T>;
}

export interface FactoryProvider<T = any> {
	provide: ProviderType<T>;
	useFactory: (container: AppContainer) => T;
}

export type Provider<T> = NewableClass<T> | ClassProvider<T> | InstanceProvider<T> | FactoryProvider<T> | ControllerProvider<T>;

/* TYPE PREDICATES */

export function isClassProvider<T>(provider: Provider<T>): provider is ClassProvider {
	return (<ClassProvider>provider).provide !== undefined && (<ClassProvider>provider).useClass !== undefined;
}

export function isFactoryProvider<T>(provider: Provider<T>): provider is FactoryProvider {
	return (<FactoryProvider>provider).provide !== undefined && (<FactoryProvider>provider).useFactory !== undefined;
}

export function isInstanceProvider<T>(provider: Provider<T>): provider is InstanceProvider {
	return (<InstanceProvider>provider).provide !== undefined && (<InstanceProvider>provider).useInstance !== undefined;
}

export function isControllerProvider<T>(provider: Provider<T>): provider is ControllerProvider {
	return (<ControllerProvider>provider).method !== undefined
		&& (<ControllerProvider>provider).route !== undefined
		&& (<ControllerProvider>provider).useClass !== undefined;
}

function isDefaultProvider<T>(provider: Provider<T>): provider is NewableClass<T> {
	return !isClassProvider(provider) && !isFactoryProvider(provider) && !isControllerProvider(provider) && !isInstanceProvider(provider)
}

/* FUNCTIONS */

export function getProviderId<T>(provider: Provider<T>): ProviderType<T> {
	if (isClassProvider(provider) || isFactoryProvider(provider) || isInstanceProvider(provider)) {
		return provider.provide;
	}
	if (isControllerProvider(provider)) {
		return provider.useClass
	}
	return provider as ProviderType<T>;
}
