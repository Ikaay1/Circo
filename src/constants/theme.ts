import { extendTheme, ThemeConfig } from "@chakra-ui/react";

//colors
const colors = {
  clique: {
    base: "#8758FF",
    white: "#FFFFFF",
    black: "#131311",
    primaryBg: "#171717",
    inputBg: "#1D1D1C",
    inputBorder: "#424242",
    grey: "#323232",
    whiteGrey: "rgba(255, 255, 255, 0.7)",
    darkGrey: "#aaaaaa",
    lightGrey: "#434343",
    ashGrey: "#1C1C1C",
    blackGrey: "#232323",
    text: "#a1a1a1",
  },
};

//
const breakpoints = {
  base: "0px",
  sm: "400px",
  md: "700px",
  lg: "1100px",
  mlg: "1440px",
  xl: "1700px",
};

//initial config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const components = {
  Checkbox: {
    baseStyle: {
      control: {
        bg: "none",
        border: "2px solid #892CDC",
        _checked: {
          bg: "#8758FF",
          color: "#fff",
          boxShadow: "none",
          outline: "none",
          border: "none",
          _hover: {
            bg: "#8758FF",
          },
        },

        boxShadow: "none",
      },
    },
    variants: {
      base: {
        control: {
          _checked: {
            bg: "#8758FF",
          },
        },
      },
    },
  },
};

const theme = extendTheme({ colors, config, breakpoints, components });

export default theme;
