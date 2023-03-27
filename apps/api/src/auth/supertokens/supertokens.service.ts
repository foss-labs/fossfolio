import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import Dashboard from 'supertokens-node/recipe/dashboard';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
    constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
        supertokens.init({
            appInfo: config.appInfo,
            supertokens: {
                connectionURI: config.connectionURI,
                apiKey: config.apiKey,
            },

            recipeList: [
                Dashboard.init({
                    apiKey: this.config.DashboardApiKey,
                }),
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
                UserMetadata.init(),
                Session.init(),
            ],
        });
    }
}
