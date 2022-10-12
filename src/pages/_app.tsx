import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { store } from "../redux/app/store";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../constants/theme";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
