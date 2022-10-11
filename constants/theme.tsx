import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

//colors
const colors = {
  clique: {
    base: "blue",
  },
};

//initial config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({ colors, config });

export default theme;
