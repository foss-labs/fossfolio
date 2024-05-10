import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { CloudModule } from './cloud/cloud.module';
import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './events/events.module';
import { StripeModule } from './stripe/stripe.module';
import { OrganizationModule } from './organization/organization.module';
import { OrganizationMemberModule } from './org-member/org-member.module';
import { OrganizationInviteModule } from './org-invite/org-invite.module';
import { AppController } from './app.controller';
import { KanbanModule } from './kanban/kanban.module';
import { FormModule } from './form/form.module';
import { AiModule } from './ai/ai.module';

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                limit: 10,
            },
        ]),
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
                WEB_URL: Joi.string(),
                MAIL_HOST: Joi.string(),
                MAIL_PORT: Joi.number(),
                MAIL_USER: Joi.string(),
                MAIL_PASSWORD: Joi.string(),
                AWS_ACCESS_KEY: Joi.string(),
                AWS_SECRET_KEY: Joi.string(),
                AWS_REGION: Joi.string(),
                STRIPE_SECRET_KEY: Joi.string(),
                STRIPE_WEBHOOK_SECRET: Joi.string(),
                AI_KEY: Joi.string(),
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
        OrganizationMemberModule,
        OrganizationInviteModule,
        EventsModule,
        MailModule,
        CloudModule,
        StripeModule,
        KanbanModule,
        AiModule,
        FormModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
