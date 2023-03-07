import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {
                        // eslint-disable-next-line react/self-closing-comp
                        <script
                            async
                            src="https://ackee.anbarasu.me/tracker.js"
                            data-ackee-server="https://ackee.anbarasu.me"
                            data-ackee-domain-id="4caf51ca-f780-4a8c-8653-5cfa441405cd"
                        ></script>
                    }
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
