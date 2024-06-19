import BaseModel from "@api/models/BaseModel";
import { Form } from "@api/db/schema";
import { Logger } from "@nestjs/common";
import { SystemTable } from "@api/utils/db";
import BaseContext from "@api/BaseContext";
import { FFError } from "@api/utils/error";
import { Knex } from "knex";

export class FormModel extends BaseModel<SystemTable.Form, Form>(
  SystemTable.Form
) {
  constructor() {
    const logger = new Logger("Form Model");
    super(logger);
  }

  static async getAllFormsWithSubmissionsCount(eventId: string, trx?: Knex) {
    try {
      const qb = trx ?? BaseContext.knex;

      const data = await qb<SystemTable.Form>(SystemTable.Form).select(
        "*",
        qb.raw(
          `(SELECT COUNT(*)::integer FROM ${SystemTable.FormResponse} e WHERE e.fk_form_id = ${SystemTable.Form}.id AND e.is_deleted = false) as total_submissions`
        )
      );

      return data;
    } catch (error) {
      FFError.databaseError(
        `${SystemTable.Form}: ${SystemTable.FormResponse}: Query Failed : `,
        error
      );
    }
  }
}
