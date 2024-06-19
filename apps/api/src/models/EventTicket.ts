import BaseModel from "@api/models/BaseModel";
import { EventTicket } from "@api/db/schema";
import { Logger } from "@nestjs/common";
import { SystemTable } from "@api/utils/db";
import { EventParams } from "@api/dto/events.dto";
import { Knex } from "knex";
import BaseContext from "@api/BaseContext";
import { FFError } from "@api/utils/error";

export class EventTicketModel extends BaseModel<
  SystemTable.EventTicket,
  EventTicket
>(SystemTable.EventTicket) {
  constructor() {
    const logger = new Logger("EventTicket Model");
    super(logger);
  }
  public static async getEventParticipants(
    { orgId, eventId }: EventParams,
    trx?: Knex
  ) {
    const qb = trx ?? BaseContext.knex;
    try {
      return await qb
        .select(
          `${SystemTable.User}.id`,
          `${SystemTable.User}.email`,
          `${SystemTable.User}.display_name`,
          `${SystemTable.User}.slug`,
          `${SystemTable.User}.photo_url`,
          `${SystemTable.User}.college_name`,
          `${SystemTable.User}.is_student`,
          `${SystemTable.EventTicket}.id as ticket_type_id`,
          `${SystemTable.EventTicket}.name as ticket_type_name`,
          `${SystemTable.Ticket}.paid_amount`,
          `${SystemTable.Ticket}.is_deleted as ticket_is_deleted`,
          `${SystemTable.Events}.id as event_id`,
          `${SystemTable.Events}.name as event_name`,
          `${SystemTable.Events}.fk_organization_id`
        )
        .from(SystemTable.Ticket)
        .innerJoin(
          SystemTable.User,
          `${SystemTable.Ticket}.fk_user_id`,
          `${SystemTable.User}.id`
        )
        .innerJoin(
          SystemTable.EventTicket,
          `${SystemTable.Ticket}.fk_event_ticket_id`,
          `${SystemTable.EventTicket}.id`
        )
        .innerJoin(
          SystemTable.Events,
          `${SystemTable.Ticket}.fk_event_id`,
          `${SystemTable.Events}.id`
        )
        .where(`${SystemTable.Ticket}.fk_event_id`, eventId)
        .andWhere(`${SystemTable.Events}.fk_organization_id`, orgId)
        .groupBy(`${SystemTable.EventTicket}.id`, `${SystemTable.User}.id`)
        .orderBy(`${SystemTable.EventTicket}.name`);
    } catch (error) {
      FFError.databaseError(`${SystemTable.User}: Query Failed : `, error);
    }
  }
}
