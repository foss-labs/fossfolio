import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth/auth.service';
import { GithubStrategy } from '../services/auth/strategy/github.strategy';
import { GoogleStrategy } from '../services/auth/strategy/google.strategy';
import { UserService } from '../services/user.service';
import { JwtStrategy } from '../services/auth/strategy/jwt.strategy';
import { RefreshStrategy } from '../services/auth/strategy/refresh.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AiController } from '../controllers/ai.controller';
import { AiService } from '../services/ai.service';
import { S3Service } from '../services/cloud.service';
import { EventsController } from '../controllers/events.controller';
import { EventsService } from '../services/events.service';
import { FormService } from '../services/form.service';
import { FormController } from '../controllers/form.controller';
import { KanbanService } from '../services/kanban.service';
import { KanbanController } from '../controllers/kanban.controller';
import { MailService } from '../services/mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'node:path';
import { ReactAdapter } from '@webtre/nestjs-mailer-react-adapter';
import { OrganizationInviteService } from '../services/org-invite.service';
import { OrgInviteController } from '../controllers/org-invite.controller';
import { OrgMemberController } from '../controllers/org-member.controller';
import { OrganizationMemberService } from '../services/org-member.service';
import { OrganizationService } from '../services/organization.service';
import { OrganizationController } from '../controllers/organization.controller';
import { PrismaService } from '../services/prisma.service';
import { UserController } from '../controllers/user.controller';
import { envSchema } from '@api/utils/envSchema';
import { CloudController } from '@api/controllers/cloud.controller';

const AuthProviders = [
	AuthService,
	GithubStrategy,
	GoogleStrategy,
	UserService,
	JwtStrategy,
	RefreshStrategy,
];

const AuthModules = [
	PassportModule,
	JwtModule.registerAsync({
		useFactory: async (configService: ConfigService) => ({
			secret: configService.get('JWT_SECRET'),
			signOptions: { expiresIn: configService.get('ACCESS_TOKEN_VALIDITY') },
		}),
		inject: [ConfigService],
	}),
];

const GlobalModules = [
	ConfigModule.forRoot({
		isGlobal: true,
		validate: envSchema.parse,
		validationOptions: {
			abortEarly: true,
		},
	}),
	EventEmitterModule.forRoot(),
	ThrottlerModule.forRoot([
		{
			ttl: 60000,
			limit: 50,
		},
	]),
	LoggerModule.forRoot({
		pinoHttp: {
			level: 'error',
			redact: ['req.headers', 'req.remoteAddress', 'res.headers'],
		},
	}),
	MailerModule.forRootAsync({
		useFactory: async (configService: ConfigService) => ({
			transport: {
				host: configService.get('MAIL_HOST'),
				port: configService.get('MAIL_PORT'),
				secure: false,
				auth: {
					user: configService.get('MAIL_USER'),
					pass: configService.get('MAIL_PASSWORD'),
				},
				tls: {
					rejectUnauthorized: false,
				},
			},
			defaults: {
				from: configService.get('MAIL_FROM'),
			},
			template: {
				dir: join(__dirname, 'templates'),
				adapter: new ReactAdapter({
					pretty: false,
					plainText: false,
				}),
				options: {
					strict: true,
				},
			},
		}),
		inject: [ConfigService],
	}),
];

@Module({
	imports: [...GlobalModules, ...AuthModules],
	controllers: [
		AuthController,
		AiController,
		OrganizationController,
		OrgMemberController,
		OrgInviteController,
		EventsController,
		FormController,
		KanbanController,
		UserController,
		CloudController,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
		...AuthProviders,
		AiService,
		S3Service,
		OrganizationService,
		OrganizationInviteService,
		OrganizationMemberService,
		EventsService,
		FormService,
		KanbanService,
		MailService,
		PrismaService,
		UserService,
	],
})
export class RootModule {}
