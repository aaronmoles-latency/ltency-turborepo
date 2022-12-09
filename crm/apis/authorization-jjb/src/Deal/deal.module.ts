import { ContainerBuilder } from 'diod';

import { Module } from '../shared/module';
import { DealRepository } from './domain/DealRepository';
import DealEntity from './infrastructure/deal.entity';
import { PostgresDealRepository } from './infrastructure/PostgresDealRepository';

export default class DealModule extends Module {
	static ENTITIES = [DealEntity]

	register(builder: ContainerBuilder): void {
		builder.register(DealRepository).use(PostgresDealRepository);
	}
}
