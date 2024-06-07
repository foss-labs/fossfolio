import type { Knex } from "knex";
import { SystemTable } from "../../utils/db";

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(SystemTable.EventTicket);

  if (isTableExists) {
    await knex.schema.alterTable(SystemTable.EventTicket, (table) => {
      table.string("fk_user_id");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(SystemTable.EventTicket, () => {
    knex.schema
      .hasColumn(SystemTable.EventTicket, "fk_user_id")
      .then((exist) => {
        knex.schema.table(SystemTable.EventTicket, (t) =>
          t.dropColumn("fk_user_id")
        );
      });
  });
}
