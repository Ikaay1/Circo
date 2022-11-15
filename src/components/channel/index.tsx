import { useRouter } from "next/router";
import React from "react";
import { Box } from "@chakra-ui/react";
import ChannelContents from "@components/channel/ChannelContents";
import { scrollBarStyle } from "@constants/utils";
import Analytics from "./Analytics";
import Bio from "./Bio";
import EditChannel from "./EditChannel";
import UserDetail from "./UserDetail";
import { useGetUserContentsQuery } from "redux/services/content.service";
import CliqueLoader from "@components/home/CliqueLoader";
import { useGetChannelQuery } from "redux/services/channel.service";

const Index = () => {
  const router = useRouter();
  const { data, isLoading } = useGetUserContentsQuery("");
  const {
    data: channelData,
    isError,
    isLoading: channelLoading,
  } = useGetChannelQuery("");
  const des =
    router.query.name === "content" || router.pathname.includes("subscribe");
  return (
    <>
      {(isLoading && channelLoading) || (!data && !channelData) ? (
        <CliqueLoader />
      ) : (
        <Box
          height={"100%"}
          overflowY="scroll"
          position={"relative"}
          pb="3rem"
          sx={scrollBarStyle}
        >
          <UserDetail data={channelData?.data?.channel} />
          {router.query.name !== "edit" && (
            <Bio
              showSubscribe={router.query.name === "analytics" ? false : true}
              bio={channelData?.data?.channel?.bio}
            />
          )}
          {des && (
            <Box mt={"6rem"} px="1.35rem">
              <ChannelContents videos={data?.data?.videos} />
            </Box>
          )}

          {router.query.name === "edit" && (
            <Box mt={"1.4rem"} px="1.35rem">
              <EditChannel />
            </Box>
          )}

          {router.query.name === "analytics" && (
            <Box mt={"6rem"} px="1.35rem">
              <Analytics />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default Index;
