import BaseModel from '@api/models/BaseModel';
import { User } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class UserModel extends BaseModel<SystemTable.User, User>(
	SystemTable.User,
) {
	constructor() {
		const logger = new Logger('UserModel');
		super(logger);
	}
}
