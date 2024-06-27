import { SystemTable, FormInput } from '../../utils/db';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const isTableExists = await knex.schema.hasTable(
		SystemTable.FormFieldOptions,
	);

	if (!isTableExists) {
		await knex.schema.createTable(SystemTable.FormFieldOptions, (table) => {
			table.string('id', 25).primary();

			table.string('fk_form_id', 25);

			table.string('option', 255);

			table.boolean('is_deleted').defaultTo(false);

			table.timestamps(true, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(SystemTable.FormFieldOptions);
}
