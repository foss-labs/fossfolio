import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadMiddleWare implements NestMiddleware {
	constructor(private readonly configService: ConfigService) {}

	use(req: Request, _: Response, next: NextFunction) {
		const url = new URL(
			this.configService.get('API_BASE_URL') + req.originalUrl,
		);
		// // Access the extracted parameters this is done to upload files to events
		if (!req.body.organizationId) {
			req.body = {
				...req.body,
			};
			req.body.organizationId = url.searchParams.get('org');
		}

		next();
	}
}
