import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

//colors
const colors = {
  clique: {
    base: "#8758FF",
    black: "#131311",
  },
};

//
const breakpoints = {
  base: "0px",
  sm: "375px",
  md: "512px",
  lg: "1440px",
  xl: "1800px",
};

//initial config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({ colors, config, breakpoints });

export default theme;
