import BaseModel from '@api/models/BaseModel';
import { KanbanCard } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class KanbanCardModal extends BaseModel<
	SystemTable.KanbanCard,
	KanbanCard
>(SystemTable.KanbanCard) {
	constructor() {
		const logger = new Logger('KanbanCard Model');
		super(logger);
	}
}
