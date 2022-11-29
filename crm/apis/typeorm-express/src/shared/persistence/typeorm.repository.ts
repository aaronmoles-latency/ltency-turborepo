import { DataSource, EntityTarget, Repository } from 'typeorm';

import { AggregateRoot } from '../domain/aggregate-root';
import { TypeormEntity } from './typeorm.entity';

export abstract class TypeOrmRepository<M extends AggregateRoot, E extends TypeormEntity<M>> {
	protected constructor(
		private readonly dataSource: DataSource,
		private readonly entity: EntityTarget<E>,
	) {}

	protected repository(): Repository<E> {
		return this.dataSource.getRepository(this.entity);
	}

	protected async persist(entity: E): Promise<void> {
		const repository = await this.repository();
		await repository.save(entity);
	}
}
