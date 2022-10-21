import SideMenu from "@components/widgets/sideMenu";
import { Box, Flex, Text } from "@chakra-ui/react";
import HomeLayout from "layouts/HomeLayout";
import React from "react";
import { purpleBoxStyle, scrollBarStyle } from "@constants/utils";
import LiveEvents from "@components/home/LiveEvents";
import DiscoverBox from "@components/discover/DiscoverBox";

function Index() {
  return (
    <HomeLayout>
      <Flex>
        <SideMenu />
        <Box
          maxH={"90vh"}
          pb="50px"
          px="30px"
          maxW={"calc(100vw - 500px)"}
          w={"calc(100vw - 500px)"}
          overflowY={"scroll"}
          overflowX={"hidden"}
          sx={scrollBarStyle}
        >
          <Text
            py="20px"
            position={"relative"}
            pl="20px"
            _before={{ ...purpleBoxStyle, background: "clique.base" }}
            color={"clique.white"}
            fontFamily={"Poppins"}
            fontWeight={500}
            textTransform={"capitalize"}
            fontSize="head"
            lineHeight={"1"}
          >
            Discover
          </Text>

          <DiscoverBox />
        </Box>
        <LiveEvents />
      </Flex>
    </HomeLayout>
  );
}

export default Index;
