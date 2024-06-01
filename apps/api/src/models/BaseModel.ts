import BaseContext from '@api/BaseContext';
import { Logger } from '@nestjs/common';
import { generateID, SystemTable } from '@api/utils/db';
import { CreateSchema, UpdateSchema } from '@api/db/schema';

export default function createBaseModel<T extends SystemTable, M>(
	tableName: SystemTable,
) {
	abstract class BaseModel {
		logger: Logger;

		constructor(logger?: Logger) {
			this.logger = logger || new Logger();
		}

		static async findById(id: string): Promise<M | null> {
			const data = await BaseContext.knex<T>(tableName)
				.where(id)
				.andWhere('is_deleted', false)
				.first();
			return (data as M) || null;
		}

		static async find(where: Partial<M>): Promise<M[]> {
			const data = await BaseContext.knex<T>(tableName)
				.where(where)
				.andWhere('is_deleted', false);
			return data as M[];
		}

		static async create(data: CreateSchema<T>): Promise<M> {
			const insertData = {
				...data,
				id: generateID(tableName),
			};
			const res = await BaseContext.knex<T>(tableName)
				.insert(insertData)
				.returning('*');
			return res[0] as M;
		}

		static async update(
			where: Partial<M>,
			data: UpdateSchema<T>,
		): Promise<M[]> {
			const res = await BaseContext.knex<T>(tableName)
				.where(where)
				.update(data)
				.returning('*');
			return res as M[];
		}

		static async delete(where: Partial<M>) {
			if (!where || Object.keys(where).length === 0) {
				throw new Error('Where clause is required for delete operation');
			}
			await BaseContext.knex<T>(tableName)
				.where(where)
				// @ts-ignore
				.update({ is_deleted: true });
			return 1;
		}

		static async dangerousHardDelete(where: Partial<M>) {
			if (!where || Object.keys(where).length === 0) {
				throw new Error('Where clause is required for dangerousHardDelete');
			}
			return BaseContext.knex<T>(tableName).where(where).del();
		}

		static async count(where: Partial<M>): Promise<number> {
			const data = await BaseContext.knex<T>(tableName)
				.where(where)
				.andWhere('is_deleted', false)
				.count();
			return Number.parseInt(data[0].count as string, 10);
		}

		static async findPaginated(
			where: Partial<M>,
			page: number,
			limit: number,
		): Promise<M[]> {
			const data = await BaseContext.knex<T>(tableName)
				.where(where)
				.andWhere('is_deleted', false)
				.limit(limit)
				.offset((page - 1) * limit);
			return data as M[];
		}

		static async dangerousRawQuery(query: string) {
			if (!query.toLowerCase().includes(tableName)) {
				throw new Error('Only raw queries for the current table are allowed');
			}
			if (!query.toLowerCase().includes('where')) {
				throw new Error('Raw query must contain a where clause');
			}
			return BaseContext.knex.raw(query);
		}
	}

	return BaseModel;
}
