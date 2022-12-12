export type ModuleDefinition<E extends Record<string, unknown>> = E

export type ModularModuleDefinition<E extends Record<string, unknown>> = {
	imports: ModularModuleDefinition<E>[],
} & ModuleDefinition<E>
