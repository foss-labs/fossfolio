import { SystemTable } from '../../utils/db';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const isTableExists = await knex.schema.hasTable(SystemTable.Form);

	if (!isTableExists) {
		await knex.schema.createTable(SystemTable.Form, (table) => {
			table.string('id', 25).primary();

			table.string('fk_event_id', 25);

			table.string('title', 255);

			table.string('description');

			table.string('logo_url');

			table.string('banner_url');

			table.string('confirmation_message');

			table.json('misc');

			table.boolean('is_default_form').defaultTo(false);

			table.boolean('is_published').defaultTo(false);

			table.boolean('is_deleted').defaultTo(false);

			table.timestamps(true, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(SystemTable.Form);
}
