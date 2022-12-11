import { MixedList } from 'typeorm/common/MixedList';

import { ModularModuleDefinition } from './module-definition';

export type ApiModule = ModularModuleDefinition<'providers'|'controllers', { entities: MixedList<Function>}>
