import ThirdParty, { Google } from 'supertokens-auth-react/recipe/thirdparty';
import Session from 'supertokens-auth-react/recipe/session';
import { ENV } from '@app/config';

export const authConfig = () => ({
    appInfo: {
        appName: ENV.appName,
        apiDomain: ENV.apiDomain,
        websiteDomain: ENV.domain,
        apiBasePath: ENV.apiPath,
        websiteBasePath: ENV.webPath,
    },
    recipeList: [
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [Google.init()],
            },
        }),
        Session.init(),
    ],
});
