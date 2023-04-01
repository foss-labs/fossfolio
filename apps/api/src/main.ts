import supertokens from 'supertokens-node';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SupertokensExceptionFilter } from './auth/auth.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });
    app.enableCors({
        origin: process.env.SUPERTOKENS_WEBSITE_DOMAIN,
        allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders(), 'st-auth-mode'],
        credentials: true,
    });

    app.useGlobalFilters(new SupertokensExceptionFilter());

    await app.listen(
        (process.env.PORT as string) || 8080,
        (process.env.HOST as string) || '0.0.0.0',
    );
}
bootstrap();
