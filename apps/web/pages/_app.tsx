import React from 'react';
import { DefaultSeo } from 'next-seo';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google'
import { Toaster } from "sonner"
import { Child } from '@app/types';
import '../theme/style.css';
import { AuthContext, AuthGuard } from '@app/context/Auth';

type ComponentWithPageLayout = AppProps & {
    Component: AppProps['Component'] & {
        Layout?: (arg: Child) => JSX.Element;
        RequireAuth: boolean;
    };
};

const inter = Inter({ subsets: ['latin'] })


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => {
    if (Component.RequireAuth) {
        return (
            <main className={inter.className}>
                <QueryClientProvider client={queryClient}>
                    <AuthContext>
                        <AuthGuard>
                            <DefaultSeo
                                title="fossfolio"
                                description="Discover, host and manage Events, all in one place."
                            />
                            {Component.Layout ? (
                                <Component.Layout>
                                    <Component {...pageProps} />
                                </Component.Layout>
                            ) : (
                                <Component {...pageProps} />
                            )}
                        </AuthGuard>
                    </AuthContext>
                </QueryClientProvider>
            </main>
        );
    }
    return (
        <main className={inter.className}>
            <QueryClientProvider client={queryClient}>
                <AuthContext>
                    <Toaster position="bottom-right" />
                    <DefaultSeo
                        title="fossfolio"
                        description="Discover,host and manage Events,Hackathons all in one place. "
                    />
                    {Component.Layout ? (
                        <Component.Layout>
                            <Component {...pageProps} />
                        </Component.Layout>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </AuthContext>
            </QueryClientProvider>
        </main>
    );
};
export default MyApp;
