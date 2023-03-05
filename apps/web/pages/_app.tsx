import React, { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SuperTokens from 'supertokens-web-js';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import initAuth from '@app/auth';
import { AuthProvider } from '@app/contexts';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

if (typeof window !== 'undefined') {
    SuperTokens.init(initAuth());
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <AuthProvider>
            <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
        </AuthProvider>
    );
};
export default MyApp;
