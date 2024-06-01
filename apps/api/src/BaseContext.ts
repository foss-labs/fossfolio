import type { Knex } from 'knex';
import knex from 'knex';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export default class BaseContext {
	public static knex: Knex;
	private static readonly logger = new Logger(BaseContext.name);

	public static async init() {
		BaseContext.knex = knex({
			client: 'pg',
			connection: {
				host: process.env.DB_HOST,
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
			},
			migrations: {
				tableName: SystemTable.FF_Migrations,
				directory: 'src/db/migrations',
			},
		});

		BaseContext.logger.log('Starting Migration process...');

		await BaseContext.knex.migrate.latest();

		BaseContext.logger.log('Migration process completed.');
	}

	public async destroy() {
		await BaseContext.knex.destroy();
	}
}
