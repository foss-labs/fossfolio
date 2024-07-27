import BaseModel from "@api/models/BaseModel";
import { Kanban } from "@api/db/schema";
import { Logger } from "@nestjs/common";
import { SystemTable } from "@api/utils/db";
import { Knex } from "knex";
import BaseContext from "@api/BaseContext";
import { FFError } from "@api/utils/error";

export class KanbanModal extends BaseModel<SystemTable.Kanban, Kanban>(
  SystemTable.Kanban
) {
  constructor() {
    const logger = new Logger("Kanban Model");
    super(logger);
  }

  static async findKanbanBoardsByEvent(id: string, trx?: Knex) {
    try {
      const qb = trx ?? BaseContext.knex;

      const kanban = await qb(SystemTable.Kanban)
        .where("fk_event_id", id)
        .select(
          "*",
          qb.raw(
            `(SELECT COALESCE(json_agg(row_to_json(${SystemTable.KanbanCard})), '[]'::json) FROM ${SystemTable.KanbanCard} WHERE ${SystemTable.KanbanCard}.fk_kanban_id = ${SystemTable.Kanban}.id) as tasks`
          )
        );

      return kanban;
    } catch (error) {
      FFError.databaseError(`${SystemTable.Kanban}: Query Failed : `, error);
      throw error; // Make sure to re-throw the error after logging it
    }
  }
}
