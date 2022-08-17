import React from 'react';
import Document, {Head, Html, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/*  Meta Tags */}
                    <meta name="author" content="Monime LTD"/>
                    <meta name="title" content="Monime Space"/>
                    <meta name="description" content="Monime - Space Cash App"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png"/>
                    <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
                    <link rel="manifest" href="/images/favicon/site.webmanifest"/>
                </Head>
                <body>
                <noscript>
                    You need to enable JavaScript to run this app.
                </noscript>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}