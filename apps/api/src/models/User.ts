import BaseModel from "@api/models/BaseModel";
import { User } from "@api/db/schema";
import { Logger } from "@nestjs/common";
import { SystemTable } from "@api/utils/db";
import { Knex } from "knex";
import BaseContext from "@api/BaseContext";
import { FFError } from "@api/utils/error";

export class UserModel extends BaseModel<SystemTable.User, User>(
  SystemTable.User
) {
  constructor() {
    const logger = new Logger("UserModel");
    super(logger);
  }

  static async findUserByEmail(email: string, trx?: Knex) {
    try {
      const user = await (trx ?? BaseContext.knex)<SystemTable.User>(
        SystemTable.User
      )
        .where({ email })
        .first();
      return user;
    } catch (error) {
      FFError.databaseError(`${SystemTable.User}: Query Failed : `, error);
    }
  }
}
