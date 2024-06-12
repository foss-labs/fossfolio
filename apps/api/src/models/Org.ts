import BaseModel from '@api/models/BaseModel';
import BaseContext from '@api/BaseContext';
import { Organization } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';
import { FFError } from '@api/utils/error';
import { Knex } from 'knex';

export class OrgModel extends BaseModel<SystemTable.Org, Organization>(
	SystemTable.Org,
) {
	constructor() {
		const logger = new Logger('Org Model');
		super(logger);
	}

	static async getOrgsWithUserAsMember(userId: string, trx?: Knex) {
		try {
			const qb = trx ?? BaseContext.knex;
			const orgs = await qb
				.select(
					`${SystemTable.OrgMember}.role`,
					`${SystemTable.Org}.name`,
					`${SystemTable.Org}.id`,
					`${SystemTable.Org}.slug`,
					`${SystemTable.Org}.is_verified`,
					`${SystemTable.Org}.created_at as org_created_at`,
					`${SystemTable.Org}.updated_at as org_updated_at`,
					`${SystemTable.Org}.is_deleted as org_is_deleted`,
					qb.raw(
						`(SELECT COUNT(*)::integer FROM ${SystemTable.OrgMember} om WHERE om.fk_organization_id = ${SystemTable.Org}.id AND om.is_deleted = false) as total_members`,
					),
					qb.raw(
						`(SELECT COUNT(*)::integer FROM ${SystemTable.Events} e WHERE e.fk_organization_id = ${SystemTable.Org}.id AND e.is_deleted = false) as total_events`,
					),
				)
				.from(SystemTable.OrgMember)
				.leftJoin(
					SystemTable.Org,
					`${SystemTable.OrgMember}.fk_organization_id`,
					`${SystemTable.Org}.id`,
				)
				.where(`${SystemTable.OrgMember}.fk_user_id`, userId)
				.andWhere(`${SystemTable.Org}.is_deleted`, false)
				.andWhere(`${SystemTable.OrgMember}.is_deleted`, false)
				.groupBy(
					`${SystemTable.OrgMember}.role`,
					`${SystemTable.Org}.id`,
					`${SystemTable.Org}.name`,
					`${SystemTable.Org}.slug`,
					`${SystemTable.Org}.is_verified`,
					`${SystemTable.Org}.created_at`,
					`${SystemTable.Org}.updated_at`,
					`${SystemTable.Org}.is_deleted`,
				);
			return orgs;
		} catch (error) {
			FFError.databaseError(`${SystemTable.OrgMember}: Query Failed : `, error);
		}
	}
}
