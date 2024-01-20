import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import 'nprogress/nprogress.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import NProgress from 'nprogress';
import { Child } from '@app/types';
import '../theme/style.css';
import { AuthContext, AuthGuard } from '@app/context/Auth';
import { Analytics } from '@vercel/analytics/react';
type ComponentWithPageLayout = AppProps & {
    Component: AppProps['Component'] & {
        Layout?: (arg: Child) => JSX.Element;
        RequireAuth: boolean;
    };
};

const inter = Inter({ subsets: ['latin'] });

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => {
    const router = useRouter();

    useEffect(() => {
        const handleStart = () => NProgress.start();

        const handleStop = () => NProgress.done();

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleStop);
        router.events.on('routeChangeError', handleStop);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleStop);
            router.events.off('routeChangeError', handleStop);
        };
    }, [router]);

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
                            <Toaster position="bottom-right" richColors />
                            {Component.Layout ? (
                                <Component.Layout>
                                    <Component {...pageProps} />
                                </Component.Layout>
                            ) : (
                                <Component {...pageProps} />
                            )}
                            <Analytics />
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
                    <Toaster position="bottom-right" richColors />
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
                    <Analytics />
                </AuthContext>
            </QueryClientProvider>
        </main>
    );
};
export default MyApp;
