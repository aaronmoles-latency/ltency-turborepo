import { DataSource, EntitySchema, Repository } from 'typeorm';

import { AggregateRoot } from '../domain/aggregate-root';

export abstract class TypeOrmRepository<T extends AggregateRoot> {
	protected constructor(
		private readonly dataSource: DataSource,
		private readonly schema: EntitySchema<T>,
	) {}

	protected repository(): Repository<T> {
		return this.dataSource.getRepository(this.schema);
	}

	protected async persist(aggregateRoot: T): Promise<void> {
		const repository = await this.repository();
		await repository.save(aggregateRoot as any);
	}
}
