import { switchAnatomy } from '@chakra-ui/anatomy';
import {
	createMultiStyleConfigHelpers,
	extendTheme,
	ThemeConfig,
} from '@chakra-ui/react';

const {definePartsStyle, defineMultiStyleConfig} =
    createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
    // define the part you're going to style
    container: {
        // ...
    },
    thumb: {
        bg: 'clique.mixedBase',
    },
    track: {
        bg: 'clique.secondaryGrey1',
        _checked: {
            bg: 'gray.100',
        },
    },
});

const switchTheme = defineMultiStyleConfig({baseStyle});

//colors
const colors = {
    clique: {
        base: '#8758FF',
        white: '#FFFFFF',
        black: '#131311',
        primaryBg: '#171717',
        inputBg: '#1D1D1C',
        inputBorder: '#424242',
        grey: '#323232',
        whiteGrey: 'rgba(255, 255, 255, 0.7)',
        darkGrey: '#aaaaaa',
        lightGrey: '#434343',
        secondaryGrey1: '#232323',
        secondaryGrey2: '#A1A1A1',
        secondaryGrey: '#434343',
        tertiary: '#3088D9',
        primaryBlue: '#3D8EC9',
        ashGrey: '#1C1C1C',
        blackGrey: '#232323',
        text: '#a1a1a1',
        brown: '#6B5653',
        yellow: '#DDF936',
        progressBg: '#6B6B6B',
        lightBase: '#B880EA',
        dark: '1A202C',
        green: '#22C55E',
        red: '#D52B2B',
        blurColor:
            'linear-gradient(92.83deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
        secondaryRed: '#BA1A1A',
        purple: '#892cdc',
        secondaryGrey4: '#292927',
        black2: '#141516',
        black3: '#000000',
        black4: '#1E1E1E',
        secondaryGrey5: '#C9C9C9',
        red2: '#FF0000',
        black5: '#1D1D1D',
        wine: 'rgba(195, 46, 46, 0.3)',
        lightGreen: 'rgba(133, 191, 154, 0.3)',
        mixedBase: 'linear-gradient(144.09deg, #892CDC 12.14%, #6E93F1 89.06%)',
    },
};

//
const breakpoints = {
    base: '0px',
    sm: '400px',
    md: '700px',
    lg: '1100px',
    mlg: '1440px',
    xl: '1700px',
};

//initial config
const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

//font sizes
const fontSizes = {
    //50px
    big: '3.125rem',
    //30px
    bigHead: '1.875rem',
    //25px
    head: '1.563rem',
    //20px
    smHead: '1.25rem',
    //16px
    subHead: '1rem',
    //14px
    smSubHead: '0.875rem',
    //8px
    xs: '0.5rem',
    //12px
    sm: '12px',
    //36px
    medium: '36px',
    //48px
    big2: '48px',
    //18px
    sm2: '18px',
    //40px
    big3: '40px',
    //6.5px
    xs2: '6.5px',
    //59px
    xl: '59px',
    //22.5px
    smHead2: '22.5px',
    //10px
    sm3: '10px',
    //11px
    xsl: '0.688rem',
};

const components = {
    Checkbox: {
        baseStyle: {
            control: {
                bg: 'none',
                border: '2px solid #892CDC',
                _checked: {
                    bg: '#8758FF',
                    color: '#fff',
                    boxShadow: 'none',
                    outline: 'none',
                    border: 'none',
                    _hover: {
                        bg: '#8758FF',
                    },
                },

                boxShadow: 'none',
            },
        },
        variants: {
            base: {
                control: {
                    _checked: {
                        bg: '#8758FF',
                    },
                },
            },
        },
    },
    Switch: switchTheme,
};

const theme = extendTheme({
    colors,
    config,
    breakpoints,
    components,
    fontSizes,
});

export default theme;
