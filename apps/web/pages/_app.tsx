import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import Router from 'next/router';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { Child } from '@app/types';
import { store } from '@app/store';
import { gqClient } from '@app/config';
import { AuthProvider } from '@app/layout';
import { PageLoader } from '@app/components/loader';

type ComponentWithPageLayout = AppProps & {
    Component: AppProps['Component'] & {
        Layout?: (arg: Child) => JSX.Element;
        RequireAuth?: boolean;
    };
};

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => {
    const [isPageLoading, setPageLoading] = useState<boolean>(false);
    // listening for route change events
    Router.events.on('routeChangeStart', () => {
        // when route change loading screen popup
        setPageLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
        setPageLoading(false);
    });

    if (Component.RequireAuth) {
        return (
            <ApolloProvider client={gqClient}>
                <Provider store={store}>
                    <DefaultSeo
                        title="FossFolio"
                        description="Discover,host and manage Events,Hackathons all in one place. "
                    />
                    <ChakraProvider>
                        <AuthProvider>
                            <PageLoader isOpen={isPageLoading} />
                            {Component.Layout ? (
                                <Component.Layout>
                                    <Component {...pageProps} />
                                </Component.Layout>
                            ) : (
                                <Component {...pageProps} />
                            )}
                        </AuthProvider>
                    </ChakraProvider>
                </Provider>
            </ApolloProvider>
        );
    }
    return (
        <ApolloProvider client={gqClient}>
            <Provider store={store}>
                <DefaultSeo
                    title="FossFolio"
                    description="Discover,host and manage Events,Hackathons all in one place. "
                />
                <ChakraProvider>
                    <PageLoader isOpen={isPageLoading} />
                    {Component.Layout ? (
                        <Component.Layout>
                            <Component {...pageProps} />
                        </Component.Layout>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </ChakraProvider>
            </Provider>
        </ApolloProvider>
    );
};
export default MyApp;
