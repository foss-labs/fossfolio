import { SystemTable } from '../../utils/db';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const isTableExists = await knex.schema.hasTable(SystemTable.Kanban);

	if (!isTableExists) {
		await knex.schema.createTable(SystemTable.Kanban, (table) => {
			table.string('id', 25).primary();

			table.string('fk_event_id', 25);

			table.string('title');

			table.boolean('is_deleted').defaultTo(false);

			table.timestamps(true, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(SystemTable.Kanban);
}
