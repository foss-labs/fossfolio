import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });

    await app.listen(
        (process.env.PORT as string) || 8080,
        (process.env.HOST as string) || '0.0.0.0',
    );
}
bootstrap();
