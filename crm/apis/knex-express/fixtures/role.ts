import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	await knex('role').del()
	await knex('role').insert([
		{ id: '2b2fe2d7-252f-48c6-80c5-e80799f63f44', name: 'Admin' },
	]);
}
