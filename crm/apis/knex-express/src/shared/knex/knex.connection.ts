import { Logger } from '@latency/core';
import { Knex } from 'knex';

export class KnexConnection {
	constructor(
		private readonly logger: Logger,
		readonly knex: Knex,
	) {
	}

	async migrateLatest(): Promise<void> {
		await this.knex.migrate.latest()
			.then(() => {
				this.logger.info('Migrations executed')
				return this.runSeeds()
			})
	}

	async runSeeds(): Promise<void> {
		await this.knex.seed.run()
			.then(() => {
				this.logger.info('Seeds executed')
			})
	}
}
