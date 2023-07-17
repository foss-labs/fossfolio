import React from 'react';
import { DefaultSeo } from 'next-seo';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { Child } from '@app/types';
import { ThemeProvider } from '@app/ui/components/ThemeProvider';
import '../theme/style.css';

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
                <ThemeProvider>
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
                </ThemeProvider>
            </QueryClientProvider>
        );
    }
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
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
            </ThemeProvider>
        </QueryClientProvider>
    );
};
export default MyApp;
