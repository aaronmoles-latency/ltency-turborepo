import 'reflect-metadata';

import { NewableClass } from '@latency/core';
import { Container, ContainerBuilder } from 'diod';

import { Module } from '../module';

function registerModules(
	modules: NewableClass<Module>[],
	builder: ContainerBuilder,
) {
	modules.forEach((module) => {
		const moduleInstance = Reflect.construct<[], Module>(module, []);
		moduleInstance.register(builder);
	});
}

export function DiContainer(
	modules: NewableClass<Module>[],
	register: (builder: ContainerBuilder) => void,
): Container {
	const builder = new ContainerBuilder();

	register(builder);
	registerModules(modules, builder);

	return builder.build();
}

export function DiTestContainer(
	register: (builder: ContainerBuilder) => void,
): Container {
	const builder = new ContainerBuilder();

	register(builder);

	return builder.build();
}
