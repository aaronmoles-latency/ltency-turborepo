import { ContainerBuilder } from 'diod';

export abstract class Module {
	abstract register(containerBuilder: ContainerBuilder): void;
}
