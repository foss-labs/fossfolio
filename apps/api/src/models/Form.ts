import BaseModel from '@api/models/BaseModel';
import { Form } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class FormModel extends BaseModel<SystemTable.Form, Form>(
	SystemTable.Form,
) {
	constructor() {
		const logger = new Logger('Form Model');
		super(logger);
	}
}
