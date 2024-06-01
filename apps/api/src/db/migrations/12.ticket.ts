import { SystemTable } from '../../utils/db';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const isTableExists = await knex.schema.hasTable(SystemTable.Ticket);

	if (!isTableExists) {
		await knex.schema.createTable(SystemTable.Ticket, (table) => {
			table.string('id', 25).primary();

			table.string('fk_event_id', 25);

			table.string('fk_user_id', 25).nullable();

			table.string('fk_event_ticket_id', 25);

			table.float('paid_amount');

			table.boolean('is_deleted').defaultTo(false);

			table.timestamps(true, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(SystemTable.Ticket);
}
