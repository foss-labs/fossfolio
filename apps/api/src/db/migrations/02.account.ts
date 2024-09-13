import { SystemTable } from '../../utils/db';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const isTableExists = await knex.schema.hasTable(SystemTable.Account);

	if (!isTableExists) {
		await knex.schema.createTable(SystemTable.Account, (table) => {
			table.string('id', 25).primary();

			table.string('fk_user_id', 25).notNullable();

			table.string('provider').notNullable();
			table.string('provider_account_id').notNullable();

			table.text('provider_access_token');
			table.text('provider_refresh_token');

			table.boolean('is_deleted').defaultTo(false);

			table.timestamps(true, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(SystemTable.Account);
}
