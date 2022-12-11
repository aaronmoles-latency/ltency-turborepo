import { MixedList } from 'typeorm/common/MixedList';

import InversifyAppContainer from './shared/container/inversify.app-container';
import { Provider } from './shared/container/provider.types';
import { ModuleDefinition } from './shared/module/module-definition';

export class InversifyExpressAppContainer extends InversifyAppContainer {
	constructor(
		private readonly moduleDefinition: ModuleDefinition<'providers'|'controllers', { entities: MixedList<Function>}>,
	) {
		super()
		this.moduleDefinition.providers
			.concat(this.moduleDefinition.controllers)
			.forEach((provider) => {
				this.register(provider)
			})
	}

	public getControllers(): Provider[] {
		return this.moduleDefinition.controllers;
	}

	public getTypeOrmEntities(): MixedList<Function> {
		return this.moduleDefinition.entities;
	}
}
