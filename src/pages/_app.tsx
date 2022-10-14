import '../styles/globals.css';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import Layout from '@/componentsLayout';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import theme from '../constants/theme';
import { store } from '../redux/app/store';

import type {AppProps} from 'next/app';
function MyApp({Component, pageProps}: AppProps) {
    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        return null;
    }

    if (typeof window === 'undefined') {
        return <></>;
    }

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
