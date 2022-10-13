import { extendTheme, ThemeConfig } from '@chakra-ui/react';

//colors
const colors = {
    clique: {
        base: 'blue',
    },
};

//
const breakpoints = {
    base: '0px',
    sm: '400px',
    md: '700px',
    lg: '1100px',
    xl: '1700px',
};

//initial config
const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};
const theme = extendTheme({colors, config, breakpoints});

export default theme;
