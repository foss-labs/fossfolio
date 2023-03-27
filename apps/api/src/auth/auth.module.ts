import { MiddlewareConsumer, Module, NestModule, DynamicModule } from '@nestjs/common';

import { AuthMiddleware } from './auth.middleware';
import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';

@Module({
    providers: [],
    exports: [],
    controllers: [],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('*');
    }

    static forRoot({
        connectionURI,
        apiKey,
        appInfo,
        githubClientId,
        githubClientSecret,
    }: AuthModuleConfig): DynamicModule {
        return {
            providers: [
                {
                    useValue: {
                        appInfo,
                        connectionURI,
                        apiKey,
                        githubClientId,
                        githubClientSecret,
                    },
                    provide: ConfigInjectionToken,
                },
            ],
            exports: [],
            imports: [],
            module: AuthModule,
        };
    }
}
