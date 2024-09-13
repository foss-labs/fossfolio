import BaseModel from '@api/models/BaseModel';
import { FormResponse } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class FormResponseModel extends BaseModel<
	SystemTable.FormResponse,
	FormResponse
>(SystemTable.FormResponse) {
	constructor() {
		const logger = new Logger('FormResponse Model');
		super(logger);
	}
}
