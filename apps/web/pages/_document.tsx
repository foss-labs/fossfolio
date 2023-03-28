import React from 'react';
import NextDocument, { Html, Main, NextScript } from 'next/document';
import Head from 'next/head';

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head>
                    `<style>*{}</style>`
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
