import { z } from 'zod';
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
            validationSchema: z.object({
                DATABASE_URL: z.string(),
                GITHUB_CLIENT_ID: z.string(),
                GITHUB_CLIENT_SECRET: z.string(),
                GITHUB_CALLBACK_URL: z.string(),
                GITHUB_SCOPE: z.string(),
                ACCESS_TOKEN_VALIDITY: z.string(),
                API_BASE_URL: z.string(),
                GOOGLE_CLIENT_ID: z.string(),
                GOOGLE_CLIENT_SECRET: z.string(),
                GOOGLE_CALLBACK_URL: z.string(),
                GOOGLE_SCOPE: z.string(),
                WEB_URL: z.string(),
                MAIL_HOST: z.string(),
                MAIL_PORT: z.number(),
                MAIL_USER: z.string(),
                MAIL_PASSWORD: z.string(),
                AWS_ACCESS_KEY: z.string(),
                AWS_SECRET_KEY: z.string(),
                AWS_REGION: z.string(),
                STRIPE_SECRET_KEY: z.string(),
                STRIPE_WEBHOOK_SECRET: z.string(),
                AI_KEY: z.string(),
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
