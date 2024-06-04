import BaseModel from '@api/models/BaseModel';
import { FormField } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class FormFieldsModel extends BaseModel<
	SystemTable.FormFields,
	FormField
>(SystemTable.FormFields) {
	constructor() {
		const logger = new Logger('FormFields Model');
		super(logger);
	}
}
