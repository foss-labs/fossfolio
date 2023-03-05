import React, { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
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

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    if (typeof window !== 'undefined') {
        initAuth();
    }
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <ChakraProvider>
            <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
        </ChakraProvider>
    );
};
export default MyApp;
