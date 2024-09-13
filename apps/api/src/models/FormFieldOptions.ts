import BaseModel from '@api/models/BaseModel';
import { FormFieldOptions } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class FormFieldOptionsModel extends BaseModel<
	SystemTable.FormFieldOptions,
	FormFieldOptions
>(SystemTable.FormFieldOptions) {
	constructor() {
		const logger = new Logger('FormFieldOptions Model');
		super(logger);
	}
}
