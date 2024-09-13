import BaseModel from '@api/models/BaseModel';
import { FormField } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';
import { Knex } from 'knex';
import BaseContext from '@api/BaseContext';
import { FFError } from '@api/utils/error';
import { FormModel } from './Form';

export class FormFieldsModel extends BaseModel<
	SystemTable.FormFields,
	FormField
>(SystemTable.FormFields) {
	constructor() {
		const logger = new Logger('FormFields Model');
		super(logger);
	}

	public static async getFieldWithOptions(formId: string, trx?: Knex) {
		try {
			const qb = trx ?? BaseContext.knex;
			const schema = await qb(SystemTable.FormFields)
				.select(
					'*',
					BaseContext.knex.raw(
						`(SELECT json_agg(option) FROM ${SystemTable.FormFieldOptions} WHERE ${SystemTable.FormFieldOptions}.fk_form_id = ${SystemTable.FormFields}.id) as options`,
					),
				)
				.where('fk_form_id', formId)
				.andWhere('is_deleted', false);

			const formInfo = await FormModel.findById(formId);

			return {
				schema,
				data: formInfo,
			};
		} catch (error) {
			FFError.databaseError(
				`${SystemTable.FormFields}: Query Failed : `,
				error,
			);
		}
	}
}
