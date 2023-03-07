import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import type { AppProps } from 'next/app';
import initAuth from '@app/auth';
import { AuthProvider } from '@app/contexts';
import { Child } from '@app/types';
import { DefaultSeo } from 'next-seo';

type ComponentWithPageLayout = AppProps & {
    Component: AppProps['Component'] & {
        Layout?: (arg: Child) => JSX.Element;
    };
};

if (typeof window !== 'undefined') {
    SuperTokens.init(initAuth());
}

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => (
    <>
        <DefaultSeo
            title="FossFolio"
            description="Discover,host and manage Events,Hackathons all in one place. "
        />
        <ChakraProvider>
            <SuperTokensWrapper>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        {Component.Layout ? (
                            <Component.Layout>
                                <Component {...pageProps} />
                            </Component.Layout>
                        ) : (
                            <Component {...pageProps} />
                        )}
                    </AuthProvider>
                </QueryClientProvider>
            </SuperTokensWrapper>
        </ChakraProvider>
    </>
);
export default MyApp;
