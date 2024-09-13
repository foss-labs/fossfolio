import BaseModel from '@api/models/BaseModel';
import { Account } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class AccountModel extends BaseModel<SystemTable.Account, Account>(
	SystemTable.Account,
) {
	constructor() {
		const logger = new Logger('Account Model');
		super(logger);
	}
}
