import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrganizationModule } from './organization/organization.module';

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
                API_BASE_URL: Joi.string(),
                GOOGLE_CLIENT_ID: Joi.string(),
                GOOGLE_CLIENT_SECRET: Joi.string(),
                GOOGLE_CALLBACK_URL: Joi.string(),
                GOOGLE_SCOPE: Joi.string(),
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
        OrganizationModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
