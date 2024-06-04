import BaseModel from '@api/models/BaseModel';
import { Ticket } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class TicketModel extends BaseModel<SystemTable.Ticket, Ticket>(
	SystemTable.Ticket,
) {
	constructor() {
		const logger = new Logger('Ticket Model');
		super(logger);
	}
}
