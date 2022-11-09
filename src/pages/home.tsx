import HomeLayout from "layouts/HomeLayout";
import React, { useEffect, useState } from "react";

import { Box, Divider, Flex } from "@chakra-ui/react";
import LiveEvents from "@components/home/LiveEvents";
import LiveTopCard from "@components/home/LiveTopCard";
import TagSection from "@components/home/TagSection";
import VideoGrid from "@components/home/VideoGrid";
import SideMenu from "@components/widgets/sideMenu";
import { scrollBarStyle } from "@constants/utils";
import { useGetChannelQuery } from "redux/services/channel.service";

function Index() {
  const [hasChannel, setHasChannel] = useState(false);
  const [numberOfTickets, setNumberOfTickets] = React.useState(2);
  const { data, isError, isLoading } = useGetChannelQuery("channel");

  useEffect(() => {
    if (data?.channel?.name) {
      setHasChannel(true);
    }
  }, []);

  return (
    <HomeLayout>
      <Flex>
        <SideMenu hasChannel={hasChannel} />
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
          <VideoGrid
            thumbWidth={{ lg: "220px", mlg: "280px", xl: "full" }}
            width={"calc(100vw - 560px)"}
            videos={["videoImg", "videoImg2", "videoImg3"]}
          />
        </Box>
        <LiveEvents />
      </Flex>
    </HomeLayout>
  );
}

export default Index;
