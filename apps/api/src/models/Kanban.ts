import BaseModel from '@api/models/BaseModel';
import { Kanban } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class KanbanModal extends BaseModel<SystemTable.Kanban, Kanban>(
	SystemTable.Kanban,
) {
	constructor() {
		const logger = new Logger('Kanban Model');
		super(logger);
	}
}
