import React, { useState } from "react";
import { IHomeLayoutProps } from "types";

import { Box, useColorModeValue } from "@chakra-ui/react";
import OpenHeader from "@components/widgets/OpenHeader";
import { useAppSelector } from "redux/app/hooks";
import Header from "@components/widgets/Header";

function OpenLayout({ children, upload, toggleView }: IHomeLayoutProps) {
  const { token } = useAppSelector((store) => store.app.userReducer);
  const [showSuggestions, setShowSuggestions] = useState(false);
  return (
    <Box
      maxH={toggleView ? "" : "100vh"}
      maxW={"100vw"}
      w="100vw"
      h={toggleView ? "" : "100vh"}
      bg={useColorModeValue("clique.lightPrimaryBg", "clique.primaryBg")}
    >
      {token ? (
        <Header
          upload={upload}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
        />
      ) : (
        <OpenHeader />
      )}
      {children}
    </Box>
  );
}

export default OpenLayout;
