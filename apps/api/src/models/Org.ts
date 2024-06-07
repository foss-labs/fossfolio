import BaseModel from "@api/models/BaseModel";
import { Organization } from "@api/db/schema";
import { Logger } from "@nestjs/common";
import { SystemTable } from "@api/utils/db";
import BaseContext from "@api/BaseContext";
import { FFError } from "@api/utils/error";
import { Knex } from "knex";

export class OrgModel extends BaseModel<SystemTable.Org, Organization>(
  SystemTable.Org
) {
  constructor() {
    const logger = new Logger("Org Model");
    super(logger);
  }

  static async getOrgWithMemberInfo(orgId: string, trx?: Knex) {
    try {
      const queryBuilder = trx ?? BaseContext.knex;
      const orgWithMember = await queryBuilder
        .select(`${SystemTable.Org}.*`, `${SystemTable.OrgMember}.*`)
        .from(SystemTable.Org)
        .leftJoin(
          SystemTable.OrgMember,
          `${SystemTable.Org}.id`,
          `${SystemTable.OrgMember}.fk_organization_id`
        )
        .where({
          [`${SystemTable.Org}.id`]: orgId,
        });

      return orgWithMember;
    } catch (error) {
      FFError.databaseError(`${SystemTable.Org}: Query Failed: `, error);
      throw error; // Ensure the error is rethrown
    }
  }
}
