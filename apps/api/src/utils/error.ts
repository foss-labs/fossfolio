import {
	BadRequestException,
	ForbiddenException,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException,
	Logger,
} from '@nestjs/common';

class RootError extends Error {
	constructor(message: string) {
		super(message);
		this.message = message;
	}
}

export class NotFound extends NotFoundException implements RootError {}

export class Forbidden extends ForbiddenException implements RootError {}

export class Unauthorized extends UnauthorizedException implements RootError {}

export class BadRequest extends BadRequestException implements RootError {}

export class InternalServerError
	extends InternalServerErrorException
	implements RootError {}

export class ExternalError extends Error implements RootError {}

export class UploadAttachmentError extends RootError {}

export class DatabaseError extends RootError {
	private readonly logger = new Logger(DatabaseError.name);
	constructor(message: string, error: unknown) {
		super(message);
		this.message =
			message + extractDBError(error as unknown as { code: string });

		// Log the error message
		this.logger.error(error);
	}
}

// biome-ignore lint/complexity/noStaticOnlyClass: Incorrectly flagged here. This class is used to create instances of the error classes.
export class FFError {
	static notFound(message: string): never {
		throw new NotFound(message);
	}

	static forbidden(message: string): never {
		throw new Forbidden(message);
	}

	static unauthorized(message: string): never {
		throw new Unauthorized(message);
	}

	static badRequest(message: string | unknown): never {
		throw new BadRequest(message);
	}

	static internalServerError(message: string): never {
		throw new InternalServerError(message);
	}

	static externalError(message: string): never {
		throw new ExternalError(message);
	}

	static databaseError(message: string, error: unknown): never {
		throw new DatabaseError(message, error);
	}

	static uploadAttachmentError(message: string): never {
		throw new UploadAttachmentError(message);
	}
}

const extractDBError = (error: { code: string }) => {
	switch (error.code) {
		case '23505':
			return 'Unique constraint violation';

		case '23503':
			return 'Foreign key constraint violation';

		case '42601':
			return 'Syntax error';

		case '23502':
			return 'Not null violation';

		case '23514':
			return 'Check constraint violation';

		case '22001':
			return 'String data right truncation';

		case '22003':
			return 'Numeric value out of range';

		case '22007':
			return 'Invalid datetime format';

		case '22008':
			return 'Datetime field overflow';

		case '22012':
			return 'Division by zero';

		case '22023':
			return 'Invalid parameter value';

		case '40001':
			return 'Serialization failure';

		case '40003':
			return 'Statement completion unknown';

		case '40P01':
			return 'Deadlock detected';

		case '55P03':
			return 'Lock not available';

		case '57014':
			return 'Query canceled';

		case '57P03':
			return 'Cannot connect now';

		case '53300':
			return 'Too many connections';

		case '54000':
			return 'Program limit exceeded';

		case '42703':
			return 'Undefined column';

		case '42P01':
			return 'Undefined table';

		case '42883':
			return 'Undefined function';

		case '42P07':
			return 'Duplicate table';

		case '42701':
			return 'Duplicate column';

		case '42P03':
			return 'Duplicate cursor';

		case '42P04':
			return 'Duplicate database';

		case '42P05':
			return 'Duplicate prepared statement';

		case '42P06':
			return 'Duplicate schema';

		case '42P10':
			return 'Invalid column reference';

		case '42P11':
			return 'Invalid cursor definition';

		case '42P12':
			return 'Invalid database definition';

		case '42P13':
			return 'Invalid function definition';

		case '42P14':
			return 'Invalid prepared statement definition';

		case '42P15':
			return 'Invalid schema definition';

		case '42P16':
			return 'Invalid table definition';

		case '42P17':
			return 'Invalid object definition';

		case '57000':
			return 'Operator intervention';

		case '55006':
			return 'Object in use';

		case '55000':
			return 'Object not in prerequisite state';

		case '57P01':
			return 'Admin shutdown';

		case '57P02':
			return 'Crash shutdown';

		case '57P04':
			return 'Database dropped';

		default:
			return 'Unknown database error';
	}
};
