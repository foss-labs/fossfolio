import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DATABASE_URL: Joi.string(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),

        LoggerModule.forRoot({
            pinoHttp: {
                level: 'info',
                redact: ['req.headers'],
            },
        }),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
