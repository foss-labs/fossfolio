import { Role, SystemTable } from '../../utils/db';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const isTableExists = await knex.schema.hasTable(SystemTable.OrgInvite);

	if (!isTableExists) {
		await knex.schema.createTable(SystemTable.OrgInvite, (table) => {
			table.string('id', 25).primary();

			table.string('fk_organization_id', 25);

			table.string('invitee_email', 255);

			table.string('inviter_uid', 25);

			table.enum('role', [Role.ADMIN, Role.EDITOR, Role.VIEWER]);

			table.boolean('is_deleted').defaultTo(false);

			table.timestamps(true, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(SystemTable.OrgInvite);
}
