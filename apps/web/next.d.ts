import type { NextComponentType, NextPageContext, NextLayoutComponentType, NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Child } from './types';

declare module 'next' {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    type NextLayoutComponentType<P = {}> = NextComponentType<NextPageContext, any, P> & {
        Layout?: (page: ReactNode) => ReactNode;
    };

    type NextPageWithLayout = NextPage & {
        Layout: (arg0: Child) => JSX.Element;
        RequireAuth: boolean;
    };
}

declare module 'next/app' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type AppLayoutProps<P = {}> = AppProps & {
        Component: NextLayoutComponentType;
    };
}
