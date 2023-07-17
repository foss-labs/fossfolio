import React from 'react';
import { DefaultSeo } from 'next-seo';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { Child } from '@app/types';
import '../theme/style.css';
import { AuthContext } from '@app/context/Auth';

type ComponentWithPageLayout = AppProps & {
    Component: AppProps['Component'] & {
        Layout?: (arg: Child) => JSX.Element;
        RequireAuth?: boolean;
    };
};

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => {
    if (Component.RequireAuth) {
        return (
            <QueryClientProvider client={queryClient}>
                <AuthContext>
                    <DefaultSeo
                        title="FossFolio"
                        description="Discover,host and manage Events,Hackathons all in one place. "
                    />
                    {/* <PageLoader isOpen={isPageLoading} /> */}
                    {Component.Layout ? (
                        <Component.Layout>
                            <Component {...pageProps} />
                        </Component.Layout>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </AuthContext>
            </QueryClientProvider>
        );
    }
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext>
                <DefaultSeo
                    title="FossFolio"
                    description="Discover,host and manage Events,Hackathons all in one place. "
                />
                {/* <PageLoader isOpen={isPageLoading} /> */}
                {Component.Layout ? (
                    <Component.Layout>
                        <Component {...pageProps} />
                    </Component.Layout>
                ) : (
                    <Component {...pageProps} />
                )}
            </AuthContext>
        </QueryClientProvider>
    );
};
export default MyApp;
