import { SystemTable, FormInput } from '../../utils/db';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const isTableExists = await knex.schema.hasTable(SystemTable.FormFields);

	if (!isTableExists) {
		await knex.schema.createTable(SystemTable.FormFields, (table) => {
			table.string('id', 25).primary();

			table.string('fk_form_id', 25);

			table.string('name', 255);

			table.string('placeholder');

			table.string('description');

			table.boolean('required').defaultTo('false');

			table.enum('type', FormInput);

			table.boolean('is_deleted').defaultTo(false);

			table.timestamps(true, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(SystemTable.FormFields);
}
