import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import BaseContext from '@api/BaseContext';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalErrorFilter } from '@api/filters/global-error.filter';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bufferLogs: true,
	});

	const configService = app.get<ConfigService>(ConfigService);

	await BaseContext.init(configService);

	app.use(
		session({
			secret: configService.get('SESSION_SECRET'),
			resave: false,
			saveUninitialized: false,
		}),
	);
	app.use(cookieParser());

	app.useGlobalPipes(new ValidationPipe());

	app.useGlobalFilters(new GlobalErrorFilter());

	app.setGlobalPrefix('api');

	app.enableCors({
		origin: configService.get('CLIENT_URL'),
		credentials: true,
	});

	const config = new DocumentBuilder()
		.setTitle('FOSSFOLIO')
		.setDescription(
			'An open source web application for people to Find, Host and Manage Events,Hackathons.',
		)
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/docs', app, document);

	await app.listen(
		configService.get<number>('PORT') as number,
		configService.get('HOST'),
	);
}

bootstrap();
