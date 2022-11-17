import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import Control from "@components/player/Control";

function StreamPlayer({ stream }: any) {
  return (
    <Flex
      pos={"relative"}
      h={"580px"}
      maxH={"580px"}
      borderRadius="20px"
      id="video"
      overflow={"hidden"}
      bg="black"
      flexDir={"column"}
    >
      <MuxPlayer
        style={{ height: "100%", maxWidth: "100%" }}
        placeholder={
          stream?.eventId?.thumbNails && stream?.eventId?.thumbNails[0]
        }
        playbackId={stream?.playbackId}
        metadata={{
          video_id: stream?.eventId?._id,
          video_title: stream?.eventId?.title,
          viewer_user_id: stream?.eventId?._id,
        }}
        streamType="live:dvr"
        autoPlay
        muted
        loading="page"
      />
    </Flex>
  );
}

export default StreamPlayer;
