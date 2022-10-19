import SideMenu from "@components/widgets/sideMenu";
import { Box, Divider, Flex } from "@chakra-ui/react";
import HomeLayout from "layouts/HomeLayout";
import React from "react";
import LiveTopCard from "@components/home/LiveTopCard";
import TagSection from "@components/home/TagSection";
import VideoGrid from "@components/home/VideoGrid";
import LiveEvents from "@components/home/LiveEvents";
import { scrollBarStyle } from "@constants/utils";

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
          overflowY={"scroll"}
          overflowX={"hidden"}
          sx={scrollBarStyle}
        >
          <LiveTopCard />
          <Divider />
          <TagSection />
          <Divider />
          <VideoGrid />
        </Box>
        <LiveEvents />
      </Flex>
    </HomeLayout>
  );
}

export default Index;
