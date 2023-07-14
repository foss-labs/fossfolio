import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });

    app.use(
        session({
            secret: process.env.SESSION_SECRET as string,
            resave: false,
            saveUninitialized: false,
        }),
    );
    app.use(cookieParser());

    await app.listen(
        (process.env.PORT as string) || 8080,
        (process.env.HOST as string) || '0.0.0.0',
    );
}
bootstrap();
