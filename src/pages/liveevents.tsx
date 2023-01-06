import HomeLayout from "layouts/HomeLayout";
import React from "react";

import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import LiveEvents from "@components/home/LiveEvents";
import LiveTopCard from "@components/home/LiveTopCard";
import TagSection from "@components/home/TagSection";
import VideoGrid from "@components/home/VideoGrid";
import EventTabs from "@components/liveevents/EventTabs";
import SideMenu from "@components/widgets/sideMenu";
import { purpleBoxStyle, scrollBarStyle3 } from "@constants/utils";
import Color from "@constants/color";

function Index() {
  return (
    <HomeLayout>
      <Flex w="full" bg={Color().lightAndPrimary}>
        <SideMenu />
        <Box
          maxH={{ base: "auto", lg: "90vh" }}
          pb="50px"
          px="30px"
          maxW={{ base: "100%", lg: "calc(100vw - 250px)" }}
          overflowY={"scroll"}
          overflowX={"hidden"}
          sx={scrollBarStyle3}
        >
          <Text
            py="20px"
            position={"relative"}
            pl="20px"
            _before={{ ...purpleBoxStyle, background: "clique.base" }}
            color={Color().blackAndWhite}
            fontFamily={"Poppins"}
            fontWeight={500}
            textTransform={"capitalize"}
            fontSize="head"
            lineHeight={"1"}
          >
            Live Events
          </Text>
          <EventTabs />
        </Box>
      </Flex>
    </HomeLayout>
  );
}

export default Index;
