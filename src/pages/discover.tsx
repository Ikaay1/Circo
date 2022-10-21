import SideMenu from "@components/widgets/sideMenu";
import { Box, Flex, Text } from "@chakra-ui/react";
import HomeLayout from "layouts/HomeLayout";
import React from "react";
import { purpleBoxStyle, scrollBarStyle } from "@constants/utils";
import LiveEvents from "@components/home/LiveEvents";
import DiscoverBox from "@components/discover/DiscoverBox";
import SubscriptionCard from "@components/discover/SubscriptionCard";

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
            fontSize="subHead"
            lineHeight={"1"}
          >
            Discover
          </Text>
          <DiscoverBox />{" "}
          <Text
            py="40px"
            position={"relative"}
            pl="20px"
            _before={{ ...purpleBoxStyle, background: "clique.base" }}
            color={"clique.white"}
            fontFamily={"Poppins"}
            fontWeight={500}
            textTransform={"capitalize"}
            fontSize="subHead"
            lineHeight={"1"}
          >
            Suggested Subscriptions
          </Text>
          <Flex overflowX={"scroll"} sx={scrollBarStyle}>
            <SubscriptionCard />
            <SubscriptionCard />
            <SubscriptionCard />
          </Flex>
        </Box>
        <LiveEvents />
      </Flex>
    </HomeLayout>
  );
}

export default Index;
