import BaseModel from '@api/models/BaseModel';
import { OrganizationMember } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';
import { Knex } from 'knex';
import BaseContext from '@api/BaseContext';
import { FFError } from '@api/utils/error';

export class OrgMemberModel extends BaseModel<
	SystemTable.OrgMember,
	OrganizationMember
>(SystemTable.OrgMember) {
	constructor() {
		const logger = new Logger('OrgMember Model');
		super(logger);
	}

	public static async getMemberRole(userId: string, orgId: String, trx?: Knex) {
		try {
			const qb = trx ?? BaseContext.knex;
			const userRole = await qb
				.select('role')
				.from(SystemTable.OrgMember)
				.where('fk_organization_id', orgId)
				.andWhere('fk_user_id', userId)
				.andWhere('is_deleted', false)
				.first();

			if (userRole && userRole.role) {
				return userRole.role;
			}
		} catch (error) {
			FFError.databaseError(`${SystemTable.OrgMember}: Query Failed : `, error);
		}
	}
}
