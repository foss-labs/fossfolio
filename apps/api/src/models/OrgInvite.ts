import BaseModel from '@api/models/BaseModel';
import { OrganizationInvite } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class OrgInviteModel extends BaseModel<
	SystemTable.OrgInvite,
	OrganizationInvite
>(SystemTable.OrgInvite) {
	constructor() {
		const logger = new Logger('OrgInvite Model');
		super(logger);
	}
}
