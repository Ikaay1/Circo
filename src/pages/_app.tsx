/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/globals.css";

import devtools from "devtools-detect";
// import useConsoleOpen from 'hooks/useConsoleOpen';
import Layout from "layouts/Layout";
import Router, { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate as PersistGateClient } from "redux-persist/integration/react";

import {
  Button,
  ChakraProvider,
  ColorModeScript,
  useToast,
} from "@chakra-ui/react";
import theme from "@constants/theme";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Chakra } from "../components/widgets/Chakara";
import { persistor, store } from "../redux/app/store";

import type { AppProps } from "next/app";
const NProgress = require("nprogress");

class PersistGateServer extends React.Component {
  render() {
    return (this.props as any).children;
  }
}
function MyApp({ Component, pageProps }: any) {
  let runtime = process.env.RUNTIME;
  let PersistGate: any = PersistGateServer;
  if (runtime === "browser") {
    PersistGate = PersistGateClient;
  }

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    Router.events.on("routeChangeStart", (url: any) => {
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", (url: any) => {
      NProgress.done();
    });

    Router.events.on("routeChangeError", (url: any) => {
      NProgress.done();
    });
  }, [Router]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
        `}
      </Script>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Chakra cookies={pageProps.cookies} theme={theme}>
            <GoogleOAuthProvider
              // clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
              clientId="75252957257-5i6nhuvt2643qo64oo76vg3a9ba4sp5g.apps.googleusercontent.com"
            >
              <Layout>
                <ColorModeScript
                  initialColorMode={theme.config.initialColorMode}
                />
                <Component {...pageProps} />
                <Toaster />
              </Layout>
            </GoogleOAuthProvider>
          </Chakra>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
