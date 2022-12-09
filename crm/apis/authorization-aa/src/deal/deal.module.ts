import { Container, ContainerBuilder } from 'diod';

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

		builder.registerAndUse(ListDeals).addTag(DiTag.QUERY_HANDLER);
		builder.register(DetailDeal)
			.useFactory((container: Container) => new Proxy(new DetailDeal(container.get(DealRepository)), {
				get: (target, propKey, receiver) => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					const origMethod = target[propKey]
					return async (...args: unknown[]) => {
						if (typeof origMethod === 'function' && propKey === 'handle') {
							const response = await origMethod.apply(target, args)
							console.log({ response })
							return response;
						}
						return origMethod.apply(target, args)
					}
				},
			}))
			.addTag(DiTag.QUERY_HANDLER);
		builder.registerAndUse(CreateDeal).addTag(DiTag.COMMAND_HANDLER);

		builder.registerAndUse(GetDealsController).addTag(DiTag.CONTROLLER);
		builder.registerAndUse(GetDealController).addTag(DiTag.CONTROLLER);
		builder.registerAndUse(PutDealController).addTag(DiTag.CONTROLLER);
	}
}
