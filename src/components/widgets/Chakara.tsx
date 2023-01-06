import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
} from "@chakra-ui/react";
import theme from "@constants/theme";

export function Chakra({ cookies, children }: any) {
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  );
}

export function getServerSideProps({ req }: any) {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  };
}
