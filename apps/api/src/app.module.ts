import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DATABASE_URL: Joi.string(),
                SUPERTOKENS_APP_NAME: Joi.string(),
                SUPERTOKENS_API_KEY: Joi.string(),
                SUPERTOKENS_API_DOMAIN: Joi.string(),
                SUPERTOKENS_WEBSITE_DOMAIN: Joi.string(),
                SUPERTOKENS_CONNECTION_URI: Joi.string(),
                GITHUB_CLIENT_ID: Joi.string(),
                GITHUB_CLIENT_SECRET: Joi.string(),
                DASHBOARD_API_KEY: Joi.string(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),

        PrismaModule,
        AuthModule.forRoot({
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI as string,
            apiKey: process.env.SUPERTOKENS_API_KEY as string,
            appInfo: {
                appName: process.env.SUPERTOKENS_APP_NAME as string,
                apiDomain: process.env.SUPERTOKENS_API_DOMAIN as string,
                websiteDomain: process.env.SUPERTOKENS_WEBSITE_DOMAIN as string,
            },
            githubClientId: process.env.GITHUB_CLIENT_ID as string,
            githubClientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            DashboardApiKey: process.env.DASHBOARD_API_KEY as string,
        }),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
