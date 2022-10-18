/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/globals.css";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "layouts/Layout";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Router from "next/router";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "@constants/theme";
import { persistor, store } from "../redux/app/store";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
const NProgress = require("nprogress");

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
            <Toaster />
          </Layout>
        </ChakraProvider> 
    </Provider>
  );
}

export default MyApp;
