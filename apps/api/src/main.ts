import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import BaseContext from '@api/BaseContext';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalErrorFilter } from '@api/filters/global-error.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

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

	await app.listen(
		configService.get<number>('PORT') as number,
		configService.get('HOST'),
	);
}

bootstrap();
