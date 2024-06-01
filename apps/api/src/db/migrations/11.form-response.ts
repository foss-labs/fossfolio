import { SystemTable } from '../../utils/db';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const isTableExists = await knex.schema.hasTable(SystemTable.FormResponse);

	if (!isTableExists) {
		await knex.schema.createTable(SystemTable.FormResponse, (table) => {
			table.string('id', 25).primary();

			table.string('fk_form_id', 25);

			table.string('fk_event_id', 25);

			table.string('fk_user_id', 25).nullable();

			table.json('response');

			table.boolean('is_deleted').defaultTo(false);

			table.timestamps(true, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(SystemTable.FormResponse);
}
