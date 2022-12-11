import { MixedList } from 'typeorm/common/MixedList';

import { AppModule } from './app.module';
import { InversifyExpressAppContainer } from './inversify-express.app-container';
import ModuleBuilder from './shared/module/module.builder';

const moduleDefinition = new ModuleBuilder<'providers'|'controllers', { entities: MixedList<Function>}>()
	.addModularModuleDefinition(AppModule)
	.build()

export const container = new InversifyExpressAppContainer(moduleDefinition);
