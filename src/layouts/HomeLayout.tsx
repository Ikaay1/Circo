import Header from "@components/widgets/Header";
import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { IHomeLayoutProps } from "types";

function HomeLayout({ children }: IHomeLayoutProps) {
  return (
    <Box
      maxH="100vh"
      maxW={"100vw"}
      w="100vw"
      h="100vh"
      overflowY={"hidden"}
      bg={useColorModeValue("white", "#171717")}
    >
      <Header />
      {children}
    </Box>
  );
}

export default HomeLayout;
