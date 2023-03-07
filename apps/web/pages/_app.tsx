import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import type { AppProps } from 'next/app';
import initAuth from '@app/auth';
import { AuthProvider } from '@app/contexts';
import { Child } from '@app/types';
import { DefaultSeo } from 'next-seo';
// import { useRouter } from 'next/router';
// import { useAckee } from 'use-ackee';

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
    // const router = useRouter();

    // useEffect(() => {
    //     const handleRouteChange = (url: string) => {
    //         // eslint-disable-next-line react-hooks/rules-of-hooks
    //         useAckee(
    //             url,
    //             {
    //                 server: 'https://ackee.anbarasu.me',
    //                 domainId: '4caf51ca-f780-4a8c-8653-5cfa441405cd',
    //             },
    //             {
    //                 detailed: true,
    //                 ignoreLocalhost: true,
    //                 ignoreOwnVisits: true,
    //             },
    //         );
    //     };
    //     router.events.on('routeChangeComplete', handleRouteChange);
    //     return () => {
    //         router.events.off('routeChangeComplete', handleRouteChange);
    //     };
    // }, [router.events]);

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
