/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { authConfig } from '@app/auth';
import { theme } from '@app/theme';
import { Child } from '@app/types';

type ComponentWithPageLayout = AppProps & {
    Component: AppProps['Component'] & {
        Layout?: (arg: Child) => JSX.Element;
    };
};

if (typeof window !== 'undefined') {
    SuperTokens.init(authConfig());
}

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => (
    <SuperTokensWrapper>
        {/* <AuthContext> */}
        <ChakraProvider theme={theme}>
            {Component.Layout ? (
                <Component.Layout>
                    <Component {...pageProps} />
                </Component.Layout>
            ) : (
                <Component {...pageProps} />
            )}
        </ChakraProvider>
        {/* </AuthContext> */}
    </SuperTokensWrapper>
);

export default MyApp;
