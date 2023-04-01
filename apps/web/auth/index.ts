import ThirdPartyJS from 'supertokens-web-js/recipe/thirdparty';
import SessionWebJs from 'supertokens-web-js/recipe/session';

const initAuth = () => ({
    appInfo: {
        appName: 'FOSSFolio',
        apiDomain: 'http://localhost:8080',
        websiteDomain: 'http://localhost:3000',
    },
    recipeList: [SessionWebJs.init(), ThirdPartyJS.init()],
});

export default initAuth;
