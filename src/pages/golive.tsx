import { Box, Text } from "@chakra-ui/react";
import GoLiveTab from "@components/golive/GoLiveTab";
import SideMenu from "@components/golive/SideMenu";
import Header from "@components/widgets/Header";
import { scrollBarStyle } from "@constants/utils";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};

function Index({}: Props) {
  const router = useRouter();
  const [state, setState] = useState<string>("stream");

  return (
    <Box>
      <Header />
      <Box h={{ lg: "90vh" }} display="flex" bg="clique.primaryBg">
        <Box flex="1" h="100%">
          <SideMenu click={(route) => setState(route)} />
        </Box>
        <Box
          maxW={"calc(100vw - 250px)"}
          minW={"calc(100vw - 250px)"}
          px="30px"
          h="100%"
          maxH={"90vh"}
          pb="12"
          overflowY={"scroll"}
          overflowX={"hidden"}
          sx={scrollBarStyle}
        >
          <Text
            pt="20px"
            position={"relative"}
            color={"clique.white"}
            fontFamily={"Poppins"}
            fontWeight={500}
            textTransform={"capitalize"}
            fontSize="head"
            lineHeight={"1"}
          >
            Go Live
          </Text>
          <GoLiveTab state={state} />
        </Box>
      </Box>
    </Box>
  );
}

export default Index;
