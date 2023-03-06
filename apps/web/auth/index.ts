import ThirdParty, { Github } from 'supertokens-auth-react/recipe/thirdparty';
import Session from 'supertokens-auth-react/recipe/session';
import Router from 'next/router';

const initAuth = () => ({
    appInfo: {
        appName: 'FOSSFolio',
        apiDomain: 'http://localhost:3001',
        websiteDomain: 'http://localhost:3000',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
    },
    recipeList: [
        Session.init(),
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [Github.init()],
            },
        }),
    ],
    windowHandler: (oI: any) => ({
        ...oI,
        location: {
            ...oI.location,
            setHref: (href: string) => {
                Router.push(href);
            },
        },
    }),
});

export default initAuth;
