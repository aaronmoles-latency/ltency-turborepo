import { Provider } from '../container/provider.types';

export type ModuleDefinition<K extends string, E = void> = Record<K, Provider[]> & E

export type ModularModuleDefinition<T extends string, E = void> = {
	imports: ModularModuleDefinition<T, E>[],
} & ModuleDefinition<T, E>
