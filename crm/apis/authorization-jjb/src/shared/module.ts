import { ContainerBuilder } from 'diod';
import { MixedList } from 'typeorm/common/MixedList';

export abstract class Module {
	public static readonly ENTITIES: MixedList<Function> = [];

	abstract register(containerBuilder: ContainerBuilder): void;
}
