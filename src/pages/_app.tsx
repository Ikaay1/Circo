/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/globals.css";

import Layout from "layouts/Layout";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Router from "next/router";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import NProgress from "nprogress";
import theme from "@constants/theme";
import { store } from "../redux/app/store";

import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

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

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
