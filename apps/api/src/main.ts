import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'node:process';
import BaseContext from '@api/BaseContext';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	await BaseContext.init();

	app.use(
		session({
			secret: process.env.SESSION_SECRET as string,
			resave: false,
			saveUninitialized: false,
		}),
	);
	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());
	// prevent body parsing in stripe webhook route to access the  stripe signature as buffer
	app.use('/api/payment/webhook', express.raw({ type: '*/*' }));
	app.setGlobalPrefix('api');
	app.enableCors({
		origin: process.env.CLIENT_URL || 'http://localhost:3000',
		credentials: true,
	});

	const config = new DocumentBuilder()
		.setTitle('FossFolio')
		.setDescription(
			'An open source web application for people to Find, Host and Manage Events.',
		)
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/docs', app, document);

	await app.listen(
		(process.env.PORT as string) || 8080,
		(process.env.HOST as string) || '0.0.0.0',
	);
}

bootstrap();
