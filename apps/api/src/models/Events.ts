import BaseModel from '@api/models/BaseModel';
import { Event } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class EventModel extends BaseModel<SystemTable.Events, Event>(
	SystemTable.Events,
) {
	constructor() {
		const logger = new Logger('Event Model');
		super(logger);
	}
}
