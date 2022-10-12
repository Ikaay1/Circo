import '../styles/globals.css';

import Layout from 'component/Layout';
import { Provider } from 'react-redux';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import theme from '../constants/theme';
import { store } from '../redux/app/store';

import type {AppProps} from 'next/app';
function MyApp({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </Provider>
    );
}

export default MyApp;
