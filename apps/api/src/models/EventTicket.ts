import BaseModel from '@api/models/BaseModel';
import { EventTicket } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class EventTicketModel extends BaseModel<
	SystemTable.EventTicket,
	EventTicket
>(SystemTable.EventTicket) {
	constructor() {
		const logger = new Logger('EventTicket Model');
		super(logger);
	}
}
