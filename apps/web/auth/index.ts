import Session from 'supertokens-web-js/recipe/session';
import ThirdParty from 'supertokens-web-js/recipe/thirdparty';
import Router from 'next/router';

const initAuth = () => ({
    appInfo: {
        appName: 'FOSSFolio',
        apiDomain: 'http://localhost:3001',
        // @ts-ignore
        websiteDomain: 'http://localhost:3000',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
    },
    recipeList: [ThirdParty.init(), Session.init()],
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
