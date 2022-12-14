import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('role', (table) => {
			table.uuid('id', { primaryKey: true }).index()
			table.string('name')
		})
		.createTable('user', (table) => {
			table.uuid('id', { primaryKey: true }).index()
			table.string('name')
			table.uuid('role_id').index()
			table.foreign('role_id').references('role.id').onUpdate('CASCADE').onDelete('CASCADE')
		})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.dropTable('user')
		.dropTable('role')
}
