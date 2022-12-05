import { ContainerBuilder } from 'diod';

import { DiTag } from '../shared/di/di-tag';
import { Module } from '../shared/module';
import CreateDeal from './application/create-deal';
import DetailDeal from './application/detail-deal';
import ListDeals from './application/list-deals';
import { DealRepository } from './domain/deal.repository';
import GetDealController from './infrastructure/controller/get.deal.controller';
import GetDealsController from './infrastructure/controller/get.deals.controller';
import PutDealController from './infrastructure/controller/put.deal.controller';
import { DealEntity } from './infrastructure/persistence/deal.entity';
import TypeormDealRepository from './infrastructure/persistence/typeorm.deal.repository';

export default class DealModule extends Module {
	static ENTITIES = [DealEntity]

	register(builder: ContainerBuilder): void {
		builder.register(DealRepository).use(TypeormDealRepository)

		builder.registerAndUse(ListDeals);
		builder.registerAndUse(DetailDeal);
		builder.registerAndUse(CreateDeal);

		builder.registerAndUse(GetDealsController).addTag(DiTag.CONTROLLER);
		builder.registerAndUse(GetDealController).addTag(DiTag.CONTROLLER);
		builder.registerAndUse(PutDealController).addTag(DiTag.CONTROLLER);
	}
}
