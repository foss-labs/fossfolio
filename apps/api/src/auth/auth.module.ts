import { Module, DynamicModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserService } from '../user/user.service';
import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';
import { SupertokensService } from './supertokens/supertokens.service';

@Module({
    providers: [SupertokensService, UserService],
    exports: [],
    controllers: [],
    imports: [HttpModule],
})
export class AuthModule {
    static forRoot({
        connectionURI,
        apiKey,
        appInfo,
        googleClientId,
        googleClientSecret,
        DashboardApiKey,
    }: AuthModuleConfig): DynamicModule {
        return {
            providers: [
                {
                    useValue: {
                        appInfo,
                        connectionURI,
                        apiKey,
                        googleClientId,
                        googleClientSecret,
                        DashboardApiKey,
                    },
                    provide: ConfigInjectionToken,
                },
                SupertokensService,
            ],
            exports: [],
            imports: [],
            module: AuthModule,
        };
    }
}
