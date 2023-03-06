import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import type { AppProps } from 'next/app';
import initAuth from '@app/auth';
import { AuthProvider } from '@app/contexts';
import { Child } from '@app/types';
import { theme } from '@app/theme';

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
    <SuperTokensWrapper>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ChakraProvider theme={theme}>
                    {Component.Layout ? (
                        <Component.Layout>
                            <Component {...pageProps} />
                        </Component.Layout>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </ChakraProvider>
            </AuthProvider>
        </QueryClientProvider>
    </SuperTokensWrapper>
);
export default MyApp;
