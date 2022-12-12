import { AppModule } from './app.module';
import { InversifyExpressAppContainer } from './inversify-express.app-container';
import { ApiModuleDefinition } from './shared/module/api.module';
import ModuleBuilder from './shared/module/module.builder';

const moduleDefinition = new ModuleBuilder<ApiModuleDefinition>()
	.addModularModuleDefinition(AppModule)
	.build()

export const container = new InversifyExpressAppContainer(moduleDefinition);
