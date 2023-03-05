import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import { Inject, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { UserService } from '../../user/user.service';
import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
    constructor(
        @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
        private httpService: HttpService,
        private userService: UserService,
    ) {
        supertokens.init({
            appInfo: this.config.appInfo,
            supertokens: {
                connectionURI: this.config.connectionURI,
                apiKey: this.config.apiKey,
            },
            recipeList: [
                Dashboard.init({
                    apiKey: this.config.DashboardApiKey,
                }),
                UserMetadata.init(),
                ThirdParty.init({
                    signInAndUpFeature: {
                        providers: [
                            ThirdParty.Google({
                                clientId: this.config.googleClientId,
                                clientSecret: this.config.googleClientSecret,
                            }),
                        ],
                    },
                    override: {
                        apis: (originalImplementation) => ({
                            ...originalImplementation,

                            async signInUpPOST(input) {
                                if (originalImplementation.signInUpPOST === undefined) {
                                    throw Error('Should never come here');
                                }

                                const response = await originalImplementation.signInUpPOST(input);

                                if (response.status === 'OK') {
                                    const accessToken = response.authCodeResponse.access_token;
                                    const { data } = await firstValueFrom(
                                        httpService
                                            .get(
                                                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
                                            )
                                            .pipe(
                                                catchError((err: AxiosError) => {
                                                    throw err.response?.data;
                                                }),
                                            ),
                                    );
                                    const temp = {
                                        id: data.id,
                                        email: data.email,
                                        avatar: data.avatar,
                                        githubID: data.githubID,
                                        bio: data.bio,
                                        student: true,
                                        name: data.name,
                                    };
                                    await userService.create(temp);
                                }

                                return response;
                            },
                        }),
                    },
                }),
                Session.init(),
            ],
        });
    }
}
