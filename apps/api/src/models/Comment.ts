import BaseModel from '@api/models/BaseModel';
import { Comment } from '@api/db/schema';
import { Logger } from '@nestjs/common';
import { SystemTable } from '@api/utils/db';

export class CommentModel extends BaseModel<SystemTable.Comment, Comment>(
	SystemTable.Comment,
) {
	constructor() {
		const logger = new Logger('Comment Model');
		super(logger);
	}
}
