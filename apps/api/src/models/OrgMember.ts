import BaseModel from '@api/models/BaseModel';
import { OrganizationMember } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class OrgMemberModel extends BaseModel<
	SystemTable.OrgMember,
	OrganizationMember
>(SystemTable.OrgMember) {
	constructor() {
		const logger = new Logger('OrgMember Model');
		super(logger);
	}
}
