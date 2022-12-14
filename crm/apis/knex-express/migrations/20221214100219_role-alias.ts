import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.alterTable('user', (table) => {
			table.string('name').notNullable().alter()
		})
		.alterTable('role', (table) => {
			table.string('alias').nullable()
			table.string('name').notNullable().alter()
		})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.alterTable('user', (table) => {
			table.string('name').nullable().alter()
		})
		.alterTable('role', (table) => {
			table.dropColumn('alias')
			table.string('name').nullable().alter()
		})
}
