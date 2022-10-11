import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { store } from "../app/store";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../constants/theme";

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
