import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DATABASE_URL: Joi.string(),
                GITHUB_CLIENT_ID: Joi.string(),
                GITHUB_CLIENT_SECRET: Joi.string(),
                GITHUB_CALLBACK_URL: Joi.string(),
                GITHUB_SCOPE: Joi.string(),
                ACCESS_TOKEN_VALIDITY: Joi.string(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),

        LoggerModule.forRoot({
            pinoHttp: {
                level: 'info',
                redact: ['req.headers', 'req.remoteAddress', 'res.headers'],
            },
        }),
        AuthModule,
        PrismaModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
