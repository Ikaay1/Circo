import SideMenu from "@components/widgets/sideMenu";
import { Box, Divider, Flex } from "@chakra-ui/react";
import HomeLayout from "layouts/HomeLayout";
import React from "react";
import LiveTopCard from "@components/home/LiveTopCard";
import TagSection from "@components/home/TagSection";
import VideoGrid from "@components/home/VideoGrid";
import LiveEvents from "@components/home/LiveEvents";

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
        ></Box>
        <LiveEvents />
      </Flex>
    </HomeLayout>
  );
}

export default Index;
