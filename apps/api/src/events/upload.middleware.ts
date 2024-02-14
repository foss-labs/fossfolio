import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UploadMiddleWare implements NestMiddleware {
    use(req: Request, _: Response, next: NextFunction) {
        let url = new URL(process.env.API_BASE_URL + req.originalUrl);
        // // Access the extracted parameters this is done to upload files to events
        if (!req.body.organizationId) {
            req.body = {};
            req.body.organizationId = url.searchParams.get('org');
        }

        next();
    }
}
