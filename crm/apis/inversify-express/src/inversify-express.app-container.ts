import { MixedList } from 'typeorm/common/MixedList';

import InversifyAppContainer from './shared/container/inversify.app-container';
import { ApiModuleDefinition } from './shared/module/api.module';
import { ControllerDefinition } from './shared/module/controller.definition';
import { ModuleDefinition } from './shared/module/module-definition';

export class InversifyExpressAppContainer extends InversifyAppContainer {
	constructor(
		private readonly moduleDefinition: ModuleDefinition<ApiModuleDefinition>,
	) {
		super()
		this.moduleDefinition.providers.forEach((provider) => {
			this.register(provider)
		})
		this.moduleDefinition.controllers.forEach((controllerDefinition) => {
			this.register(controllerDefinition.controller)
		})
	}

	public getControllerDefinitions(): ControllerDefinition[] {
		return this.moduleDefinition.controllers;
	}

	public getTypeOrmEntities(): MixedList<Function> {
		return this.moduleDefinition.entities;
	}
}
