import type { Knex } from 'knex';

import { SystemTable } from '../../utils/db';

export async function up(knex: Knex): Promise<void> {
	const isTableExists = await knex.schema.hasTable(SystemTable.User);

	if (!isTableExists) {
		await knex.schema.createTable(SystemTable.User, (table) => {
			table.string('id', 25).primary();

			table.string('email').notNullable().unique();

			table.string('display_name');

			table.string('slug').unique();

			table.text('photo_url');

			table.text('college_name');

			table.boolean('is_student');

			table.text('refresh_token');

			table.boolean('is_deleted').defaultTo(false);

			table.timestamps(true, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(SystemTable.User);
}
