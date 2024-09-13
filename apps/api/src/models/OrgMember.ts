import BaseModel from '@api/models/BaseModel';
import { OrganizationMember } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { Role, SystemTable } from '@api/utils/db';
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

	public static async getMemberRole(userId: string, orgId: string, trx = BaseContext.knex) {
		try {
			const qb = trx
			const userRole = await qb
				.select('role')
				.from(SystemTable.OrgMember)
				.where('fk_organization_id', orgId)
				.andWhere('fk_user_id', userId)
				.andWhere('is_deleted', false)
				.first();

			if (userRole?.role) {
				return userRole.role;
			}
		} catch (error) {
			FFError.databaseError(`${SystemTable.OrgMember}: Query Failed : `, error);
		}
	}

	public static async getOrgMembersWithInfo(orgId: string, trx?: Knex) {
		try {
			const qb = trx ?? BaseContext.knex;
			return await qb
				.select(
					`${SystemTable.OrgMember}.id`,
					`${SystemTable.OrgMember}.role`,
					`${SystemTable.OrgMember}.fk_user_id`,
					`${SystemTable.OrgMember}.role`,
					`${SystemTable.OrgMember}.created_at`,
					`${SystemTable.OrgMember}.updated_at`,
					`${SystemTable.User}.display_name`,
					`${SystemTable.User}.email`,
					`${SystemTable.User}.photo_url`,
				)
				.from(SystemTable.OrgMember)
				.leftJoin(
					SystemTable.User,
					`${SystemTable.OrgMember}.fk_user_id`,
					`${SystemTable.User}.id`,
				)
				.where('fk_organization_id', orgId);
		} catch (error) {
			FFError.databaseError(`${SystemTable.OrgMember}: Query Failed : `, error);
		}
	}

	public static async getMemberWhoWasFirstAdded(orgId: string, trx?: Knex) {
		try {
			const qb = trx ?? BaseContext.knex;
			const result = await qb
				.select(`${SystemTable.OrgMember}.fk_user_id`)
				.from(SystemTable.OrgMember)
				.leftJoin(
					SystemTable.User,
					`${SystemTable.OrgMember}.fk_user_id`,
					`${SystemTable.User}.id`,
				)
				.where('fk_organization_id', orgId)
				.andWhere('is_deleted', false)
				.orderBy('created_at', 'asc')
				.limit(1)
				.offset(1);

			return result.length > 0 ? result[0].fk_user_id : null;
		} catch (error) {
			FFError.databaseError(`${SystemTable.OrgMember}: Query Failed : `, error);
		}
	}
}
