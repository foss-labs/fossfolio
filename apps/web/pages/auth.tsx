import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import SuperTokens, { redirectToAuth } from 'supertokens-auth-react';

const SuperTokensComponentNoSSR = dynamic<
    React.ComponentProps<typeof SuperTokens.getRoutingComponent>
    // eslint-disable-next-line no-promise-executor-return
>(new Promise((res) => res(SuperTokens.getRoutingComponent)), { ssr: false });

// eslint-disable-next-line react/function-component-definition
export default function Auth() {
    // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
    useEffect(() => {
        if (SuperTokens.canHandleRoute() === false) {
            redirectToAuth();
        }
    }, []);

    return <SuperTokensComponentNoSSR />;
}
