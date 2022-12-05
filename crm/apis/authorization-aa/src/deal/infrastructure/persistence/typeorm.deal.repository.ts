import { Optional } from '@latency/core';
import { TypeOrmRepository } from '@latency/typeorm';
import { DataSource } from 'typeorm';

import { Repository } from '../../../shared/decorators/repository.decorator';
import Deal from '../../domain/deal';
import { DealRepository } from '../../domain/deal.repository';
import DealId from '../../domain/deal-id';
import { DealEntity } from './deal.entity';

@Repository()
export default class TypeormDealRepository
	extends TypeOrmRepository<Deal, DealEntity> implements DealRepository {
	constructor(dataSource: DataSource) {
		super(dataSource, DealEntity)
	}

	async save(user: Deal): Promise<void> {
		await this.persist(DealEntity.fromDeal(user))
	}

	public findAll(): Promise<Deal[]> {
		return super.findAll();
	}

	async findOne(dealId: DealId): Promise<Optional<Deal>> {
		const entity = await super.repository().findOneBy({ id: dealId.value })
		return entity?.toModel();
	}
}
