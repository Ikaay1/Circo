import React from "react";
import { IHomeLayoutProps } from "types";

import { Box, useColorModeValue } from "@chakra-ui/react";
import OpenHeader from "@components/widgets/OpenHeader";
import { useAppSelector } from "redux/app/hooks";
import Header from "@components/widgets/Header";

function OpenLayout({ children, toggleView }: IHomeLayoutProps) {
  const { token } = useAppSelector((store) => store.app.userReducer);
  return (
    <Box
      maxH={toggleView ? "" : "100vh"}
      maxW={"100vw"}
      w="100vw"
      h={toggleView ? "" : "100vh"}
      bg={useColorModeValue("clique.lightPrimaryBg", "clique.primaryBg")}
    >
      {token ? <Header /> : <OpenHeader />}
      {children}
    </Box>
  );
}

export default OpenLayout;
