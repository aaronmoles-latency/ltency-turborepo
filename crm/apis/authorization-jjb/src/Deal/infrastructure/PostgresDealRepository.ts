import { DataSource, TypeOrmRepository } from '@latency/typeorm';

import { Repository } from '../../shared/decorators/repository.decorator';
import { Deal } from '../domain/Deal';
import { DealRepository } from '../domain/DealRepository';
import DealEntity from './deal.entity';

@Repository()
export class PostgresDealRepository extends TypeOrmRepository<Deal, DealEntity> implements DealRepository{
	constructor(dataSource: DataSource) {
		super(dataSource, DealEntity)
	}

	async create(deal: Deal): Promise<void> {
		await this.persist(DealEntity.from(deal))
	}
}
