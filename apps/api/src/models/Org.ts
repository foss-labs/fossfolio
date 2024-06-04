import BaseModel from '@api/models/BaseModel';
import { Organization } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class OrgModel extends BaseModel<SystemTable.Org, Organization>(
	SystemTable.Org,
) {
	constructor() {
		const logger = new Logger('Org Model');
		super(logger);
	}
}
