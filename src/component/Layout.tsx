import Head from "next/head";
import React from "react";

import { Box } from "@chakra-ui/react";

const Layout = ({ children }: { children: any }) => {
  return (
    <Box>
      <Head>
        <title>Clique</title>
      </Head>
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
