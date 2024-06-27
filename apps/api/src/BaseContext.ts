import type { Knex } from 'knex';
import knex from 'knex';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';
import { ConfigService } from '@nestjs/config';
import { FFError } from '@api/utils/error';

export default class BaseContext {
	public static knex: Knex;
	public static config: ConfigService;
	private static readonly logger = new Logger(BaseContext.name);

	public static async init(_config: ConfigService) {
		this.config = _config;

		BaseContext.knex = knex({
			client: 'pg',
			connection: {
				host: this.config.get('DB_HOST'),
				user: this.config.get('DB_USER'),
				password: this.config.get('DB_PASSWORD'),
				database: this.config.get('DB_NAME'),
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

	public async getTransaction() {
		return BaseContext.knex.transaction();
	}

	public async commitTransaction(trx: Knex.Transaction) {
		await trx.commit();
	}

	public async rollbackTransaction(trx: Knex.Transaction) {
		await trx.rollback();
	}

	public async execRawQuery(query: string, trx?: Knex.Transaction) {
		if (!query.toLowerCase().includes('where')) {
			throw new Error(
				'Raw query must contain a where clause. For unrestricted usage, use BaseContext.knex.raw()',
			);
		}
		try {
			return await (trx ?? BaseContext.knex).raw(query);
		} catch (error: unknown) {
			BaseContext.logger.error(
				`BaseContext: RawQuery Failed : ${query} `,
				error,
			);
			FFError.databaseError(`BaseContext: RawQuery Failed : ${query} `, error);
		}
	}

	public async dangerousExecRawQuery(query: string, trx?: Knex.Transaction) {
		try {
			return await (trx ?? BaseContext.knex).raw(query);
		} catch (error: unknown) {
			BaseContext.logger.error(
				`BaseContext: DangerousExecRawQuery Failed : ${query} `,
				error,
			);
			FFError.databaseError(
				'BaseContext: DangerousExecRawQuery Failed : ',
				error,
			);
		}
	}
}
