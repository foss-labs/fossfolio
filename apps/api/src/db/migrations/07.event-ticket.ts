import { SystemTable } from '../../utils/db';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const isTableExists = await knex.schema.hasTable(SystemTable.EventTicket);

	if (!isTableExists) {
		await knex.schema.createTable(SystemTable.EventTicket, (table) => {
			table.string('id', 25).primary();

			table.string('fk_event_id', 25);

			table.string('name', 255);

			table.string('description');

			table.decimal('price', 10, 2);

			table.integer('quantity');

			table.json('stripe_price_object').nullable();

			table.json('stripe_product_object').nullable();

			table.boolean('is_active').defaultTo(false);

			table.timestamps(true, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(SystemTable.EventTicket);
}
