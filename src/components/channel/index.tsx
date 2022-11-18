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

const Index = ({
  channelData,
  data,
  channelLoading,
  isLoading,
}: {
  channelData?: any;
  data?: any;
  channelLoading?: boolean;
  isLoading?: boolean;
}) => {
  const router = useRouter();
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
          {router.query.name !== "edit" && (
            <UserDetail
              data={channelData?.data?.channel}
              id={channelData?.data?.channel?.userId}
            />
          )}

          {router.query.name !== "edit" && (
            <Bio
              showSubscribe={router.query.name === "analytics" ? false : true}
              bio={channelData?.data?.channel?.bio}
            />
          )}
          {des && (
            <Box mt={"6rem"} px="1.35rem">
              <ChannelContents
                videos={data?.data?.videos}
                id={channelData?.data?.channel?.userId}
                isLoading={channelLoading as boolean}
              />
            </Box>
          )}

          {router.query.name === "edit" && (
            <Box>
              <EditChannel data={channelData?.data?.channel} />
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
