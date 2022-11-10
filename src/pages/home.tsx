import { useGetContentsQuery } from "redux/services/content.service";

import { Box, Divider, Flex } from "@chakra-ui/react";
import LiveEvents from "@components/home/LiveEvents";
import LiveTopCard from "@components/home/LiveTopCard";
import TagSection from "@components/home/TagSection";
import VideoGrid from "@components/home/VideoGrid";
import SideMenu from "@components/widgets/sideMenu";
import { scrollBarStyle } from "@constants/utils";
import React, { useEffect, useState } from "react";
import { useGetChannelQuery } from "redux/services/channel.service";
import HomeLayout from "layouts/HomeLayout";

function Index() {
  const [hasChannel, setHasChannel] = useState(true);
  const [numberOfTickets, setNumberOfTickets] = React.useState(2);
  const {
    data: channelData,
    isError,
    isLoading: channelLoading,
  } = useGetChannelQuery("channel");

  useEffect(() => {
    if (!channelLoading && channelData?.channelData?.channel === null) {
      setHasChannel(false);
    }
  }, [channelLoading, channelData, hasChannel]);

  const { data, isLoading } = useGetContentsQuery("");
  return (
    <>
      {isLoading || !data ? (
        <Box></Box>
      ) : (
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
                videos={data.data.preference.videos}
              />
            </Box>
            <LiveEvents />
          </Flex>
        </HomeLayout>
      )}
    </>
  );
}

export default Index;
