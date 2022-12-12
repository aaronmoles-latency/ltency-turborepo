import { ModularModuleDefinition, ModuleDefinition } from './module-definition';

export default class ModuleBuilder<E extends Record<string, unknown>> {
	private readonly modularModuleDefinition: ModularModuleDefinition<E>[];

	constructor() {
		this.modularModuleDefinition = []
	}

	public addModularModuleDefinition(mmd: ModularModuleDefinition<E>): ModuleBuilder<E> {
		this.modularModuleDefinition.push(mmd)
		return this;
	}

	public addModuleDefinition(md: ModuleDefinition<E>): ModuleBuilder<E> {
		this.modularModuleDefinition.push({
			imports: [],
			...md,
		})
		return this;
	}

	public build(): ModuleDefinition<E> {
		if (!this.modularModuleDefinition.length) {
			throw new Error('Need at least one module definition to build.')
		}
		return this.combine(
			this.modularModuleDefinition.map((mmd) => this.reduce(mmd)),
		)
	}

	private reduce(modularModuleDefinition: ModularModuleDefinition<E>): ModuleDefinition<E> {
		const { imports, ...moduleDefinition } = modularModuleDefinition;
		if (!imports?.length) {
			return moduleDefinition as unknown as ModuleDefinition<E>;
		}
		return this.combine(
			imports
				.map((modularModuleDefinition) => this.reduce(modularModuleDefinition))
				.concat(modularModuleDefinition),
		)
	}

	private combine(moduleDefinitions: ModuleDefinition<E>[]): ModuleDefinition<E> {
		if (!moduleDefinitions.length) {
			throw new Error('Need at least one element to combine.')
		}
		const newValue = moduleDefinitions[0]
		for (let i = 1; i < moduleDefinitions.length; i++) {
			Object.keys(newValue).forEach((key) => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				newValue[key] = newValue[key].concat(moduleDefinitions[i][key])
			})
		}
		return newValue
	}
}
