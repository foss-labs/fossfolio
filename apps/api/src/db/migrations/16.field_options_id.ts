import { SystemTable } from '../../utils/db';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const isTableExists = await knex.schema.hasTable(
		SystemTable.FormFieldOptions,
	);

	if (!isTableExists) {
		await knex.schema.alterTable(SystemTable.FormFieldOptions, (table) => {
			table.string('fk_field_id', 25);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(SystemTable.FormFieldOptions, (table) => {
		table.dropColumn('fk_field_id');
	});
}
