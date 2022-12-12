import { MixedList } from 'typeorm/common/MixedList';

import { Provider } from '../container/provider.types';
import { ControllerDefinition } from './controller.definition';
import { ModularModuleDefinition } from './module-definition';

export type ApiModuleDefinition = ModularModuleDefinition<{
	providers: Provider[],
	controllers: ControllerDefinition[],
	entities: MixedList<Function>
}>
