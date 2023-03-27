import Dashboard from 'supertokens-node/recipe/dashboard';
import { Inject, Injectable } from '@nestjs/common';
import SuperTokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
import UserMetadata from 'supertokens-node/recipe/usermetadata';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
    constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
        SuperTokens.init({
            appInfo: this.config.appInfo,
            supertokens: {
                connectionURI: this.config.connectionURI,
                apiKey: this.config.apiKey,
            },
            recipeList: [
                ThirdParty.init({
                    signInAndUpFeature: {
                        providers: [
                            ThirdParty.Github({
                                clientId: this.config.githubClientId,
                                clientSecret: this.config.githubClientSecret,
                            }),
                        ],
                    },
                }),
                Dashboard.init({
                    apiKey: this.config.DashboardApiKey,
                }),
                UserMetadata.init(),
                Session.init(),
            ],
        });
    }
}
