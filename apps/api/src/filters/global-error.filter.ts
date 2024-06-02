import {
	ExceptionFilter,
	ArgumentsHost,
	NotFoundException,
} from '@nestjs/common';
import {
	BadRequest,
	DatabaseError,
	ExternalError,
	Forbidden,
	InternalServerError,
	NotFound,
	Unauthorized,
} from '@api/utils/error';

export class GlobalErrorFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const res = ctx.getResponse();

		if (exception instanceof DatabaseError) {
			res.status(500).json({
				message: exception.message,
				name: exception.name,
			});
		} else if (exception instanceof NotFound) {
			res.status(404).json({
				message: exception.message,
				name: exception.name,
			});
		} else if (exception instanceof Forbidden) {
			res.status(403).json({
				message: exception.message,
				name: exception.name,
			});
		} else if (exception instanceof Unauthorized) {
			res.status(401).json({
				message: exception.message,
				name: exception.name,
			});
		} else if (exception instanceof BadRequest) {
			res.status(400).json({
				message: exception.message,
				name: exception.name,
			});
		} else if (exception instanceof ExternalError) {
			res.status(500).json({
				message: exception.message,
				name: exception.name,
			});
		} else if (exception instanceof InternalServerError) {
			res.status(500).json({
				message: exception.message,
				name: exception.name,
			});
		} else if (exception instanceof NotFoundException) {
			res.status(404).json({
				message: exception.message,
				name: exception.name,
			});
		} else {
			res.status(500).json({
				message:
					exception instanceof Error
						? exception.message
						: 'Internal Server Error',
				name: exception instanceof Error ? exception.name : 'Error',
			});
		}
	}
}
