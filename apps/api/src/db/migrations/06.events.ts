import { Role, SystemTable } from '../../utils/db';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const isTableExists = await knex.schema.hasTable(SystemTable.Events);

	if (!isTableExists) {
		await knex.schema.createTable(SystemTable.Events, (table) => {
			table.string('id', 25).primary();

			table.string('name', 255);

			table.string('slug', 255);

			table.string('fk_organization_id', 25);

			table.string('description');

			table.string('website').nullable();

			table.string('cover_image').nullable();

			table.string('location', 255);

			table.timestamp('event_date');

			table.boolean('is_published').defaultTo(false);

			table.boolean('is_deleted').defaultTo(false);

			table.timestamps(true, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(SystemTable.Events);
}
