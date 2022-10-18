import SideMenu from "@components/widgets/sideMenu";
import { Box, Flex, HStack } from "@chakra-ui/react";
import HomeLayout from "layouts/HomeLayout";
import React from "react";
import LiveEvents from "@components/home/LiveEvents";
import TrendingBox from "@components/trending/TrendingBox";
import PopularBox from "@components/trending/PopularBox";

function Index() {
  return (
    <HomeLayout>
      <Flex>
        <SideMenu />
        <Box
          maxH={"90vh"}
          minH={"90vh"}
          pb="50px"
          px="30px"
          pt="30px"
          maxW={"calc(100vw - 500px)"}
          minW={"calc(100vw - 500px)"}
          overflowY={"scroll"}
          overflowX={"hidden"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
              rounded: "full",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              bg: "clique.primaryBg",
              outline: "none",
            },
          }}
        >
          <HStack h="100%" minH="100%" spacing={"20px"}>
            <TrendingBox />
            <PopularBox />
          </HStack>
        </Box>
        <LiveEvents />
      </Flex>
    </HomeLayout>
  );
}

export default Index;
