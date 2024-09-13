import { SystemTable } from '../../utils/db';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const isTableExists = await knex.schema.hasTable(SystemTable.Org);

	if (!isTableExists) {
		await knex.schema.createTable(SystemTable.Org, (table) => {
			table.string('id', 25).primary();

			table.string('name').notNullable().unique();

			table.string('slug').unique();

			table.boolean('is_verified').defaultTo(false);

			table.boolean('is_deleted').defaultTo(false);

			table.timestamps(true, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(SystemTable.Org);
}
