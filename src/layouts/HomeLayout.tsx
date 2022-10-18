import Header from "@components/widgets/Header";
import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { IHomeLayoutProps } from "types";

function HomeLayout({ children, upload, toggleView }: IHomeLayoutProps) {
  return (
    <Box
      maxH={toggleView ? "" : "100vh"}
      maxW={"100vw"}
      w="100vw"
      h={toggleView ? "" : "100vh"}
      // overflowY={"hidden"}
      bg={useColorModeValue("clique.white", "clique.primaryBg")}
    >
      <Header upload={upload} />
      {children}
    </Box>
  );
}

export default HomeLayout;
