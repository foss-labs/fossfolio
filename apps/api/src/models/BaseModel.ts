import BaseContext from '@api/BaseContext';
import { CreateSchema, UpdateSchema } from '@api/db/schema';
import { SystemTable, generateID } from '@api/utils/db';
import { Logger } from '@nestjs/common';
import { DatabaseError, FFError } from '@api/utils/error';
import { Knex } from 'knex';

export type OrderBy<M> = {
	[K in keyof M]: {
		order: 'asc' | 'desc';
		nulls?: 'first' | 'last';
	};
};

export default function createBaseModel<T extends SystemTable, M>(
	tableName: SystemTable,
) {
	abstract class BaseModel {
		logger: Logger;

		constructor(logger?: Logger) {
			this.logger = logger || new Logger();
		}

		static async findById(id: string, trx?: Knex) {
			try {
				const data = await (trx ?? BaseContext.knex)<T>(tableName)
					.where(id)
					.andWhere('is_deleted', false)
					.first();
				return (data as M) || null;
			} catch (error: unknown) {
				FFError.databaseError(`${tableName}: Query Failed : `, error);
			}
		}

		static async find(where: Partial<M>, orderBy?: OrderBy<M>, trx?: Knex) {
			try {
				const qb = (trx ?? BaseContext.knex)<T>(tableName)
					.where(where)
					.andWhere('is_deleted', false);
				if (orderBy) {
					for (const [key, value] of Object.entries(orderBy) as [
						keyof M,
						{ order: 'asc' | 'desc'; nulls?: 'first' | 'last' },
					][]) {
						qb.orderBy(key as string, value?.order, value.nulls ?? 'last');
					}
				}
				const data = await qb;
				return data as M[];
			} catch (error: unknown) {
				FFError.databaseError(`${tableName}: Query Failed : `, error);
			}
		}

		static async insert(data: CreateSchema<T>, trx?: Knex) {
			try {
				const insertData = {
					...data,
					id: generateID(tableName),
				};
				const res = await (trx ?? BaseContext.knex)<T>(tableName)
					.insert(insertData)
					.returning('*');
				return res[0] as M;
			} catch (error: unknown) {
				FFError.databaseError(`${tableName}: Query Failed : `, error);
			}
		}

		static async insertMany(data: CreateSchema<T>[], trx?: Knex) {
			try {
				const insertData = data.map((d) => ({
					...d,
					id: generateID(tableName),
				}));
				const res = await (trx ?? BaseContext.knex)<T>(tableName)
					.insert(insertData as never)
					.returning('*');
				return res as M[];
			} catch (error: unknown) {
				FFError.databaseError(`${tableName}: Query Failed : `, error);
			}
		}

		static async update(where: Partial<M>, data: UpdateSchema<T>, trx?: Knex) {
			try {
				const res = await (trx ?? BaseContext.knex)<T>(tableName)
					.where(where)
					.update(data)
					.returning('*');
				return res as M[];
			} catch (error: unknown) {
				FFError.databaseError(`${tableName}: Query Failed : `, error);
			}
		}

		static async delete(where: Partial<M>, trx?: Knex) {
			if (!where || Object.keys(where).length === 0) {
				throw new Error('Where clause is required for delete operation');
			}
			try {
				await (trx ?? BaseContext.knex)<T>(tableName)
					.where(where)
					// @ts-ignore
					.update({ is_deleted: true });
				return 1;
			} catch (error: unknown) {
				throw new DatabaseError(`${tableName}: Query Failed : `, error);
			}
		}

		static async dangerousHardDelete(where: Partial<M>, trx?: Knex) {
			if (!where || Object.keys(where).length === 0) {
				throw new Error('Where clause is required for dangerousHardDelete');
			}
			try {
				return (trx ?? BaseContext.knex)<T>(tableName).where(where).del();
			} catch (error: unknown) {
				FFError.databaseError(`${tableName}: Query Failed : `, error);
			}
		}

		static async count(where: Partial<M>, trx?: Knex) {
			try {
				const data = await (trx ?? BaseContext.knex)<T>(tableName)
					.where(where)
					.andWhere('is_deleted', false)
					.count();
				return Number.parseInt(data[0].count as string, 10);
			} catch (error: unknown) {
				FFError.databaseError(`${tableName}: Query Failed : `, error);
			}
		}

		static async findPaginated(
			where: Partial<M>,
			page: number,
			limit: number,
			orderBy?: OrderBy<M>,
			trx?: Knex,
		) {
			try {
				const qb = (trx ?? BaseContext.knex)<T>(tableName)
					.where(where)
					.andWhere('is_deleted', false)

					.limit(limit)
					.offset((page - 1) * limit);

				if (orderBy) {
					for (const [key, value] of Object.entries(orderBy) as [
						keyof M,
						{ order: 'asc' | 'desc'; nulls?: 'first' | 'last' },
					][]) {
						qb.orderBy(key as string, value?.order, value.nulls ?? 'last');
					}
				}
				const data = await qb;
				return data as M[];
			} catch (error: unknown) {
				FFError.databaseError(`${tableName}: Query Failed : `, error);
			}
		}

		static async dangerousRawQuery(query: string, trx?: Knex) {
			if (!query.toLowerCase().includes(tableName)) {
				throw new Error('Only raw queries for the current table are allowed');
			}
			if (!query.toLowerCase().includes('where')) {
				throw new Error('Raw query must contain a where clause');
			}
			try {
				return (trx ?? BaseContext.knex).raw(query);
			} catch (error: unknown) {
				FFError.databaseError(`${tableName}: Query Failed : `, error);
			}
		}
	}

	return BaseModel;
}
