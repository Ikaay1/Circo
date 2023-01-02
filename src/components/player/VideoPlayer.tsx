import React, { useEffect } from "react";

import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderTrack,
} from "@chakra-ui/react";
import { contentData } from "@constants/utils";

import Control from "./Control";

const { Player, ControlBar, BigPlayButton } = require("video-react");

function VideoPlayer({
  video,
  videoIdsList,
}: {
  video: contentData;
  videoIdsList: {
    _id: string;
  }[];
}) {
  const currentVideoIndex = videoIdsList.findIndex(
    (videoId) => videoId?._id === video._id
  );

  const [nextVideoIndex, setNextVideoIndex] = React.useState<number | null>(
    null
  );

  const [prevVideoIndex, setPrevVideoIndex] = React.useState<number | null>(
    null
  );

  useEffect(() => {
    const length = videoIdsList.length;
    console.log(length, " video list");

    if (currentVideoIndex === 0 && length > 1) {
      setPrevVideoIndex(null);
      setNextVideoIndex(currentVideoIndex + 1);
      return;
    } else if (currentVideoIndex === length - 1 && length > 1) {
      setNextVideoIndex(0);
      setPrevVideoIndex(currentVideoIndex - 1);
      return;
    } else if (length === 1) {
      setNextVideoIndex(null);
      setPrevVideoIndex(null);
      return;
    } else {
      setNextVideoIndex(currentVideoIndex + 1);
      setPrevVideoIndex(currentVideoIndex - 1);
    }
  }, [currentVideoIndex, videoIdsList]);

  const [currentTimestamp, setCurrentTimestamp] = React.useState(0);
  const [totalDuration, setTotalDuration] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isPlay, setIsPlay] = React.useState(true);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const playerRef: any = React.useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.subscribeToStateChange((state: any) => {
        setCurrentTimestamp(state.currentTime);
        setTotalDuration(state.duration);
        setIsPlay(state.paused);
      });
    }
  }, []);
  return (
    <Flex
      pos={"relative"}
      h={{ base: "400px", lg: "580px" }}
      maxH={{ base: "400px", lg: "580px" }}
      borderRadius="20px"
      id="video"
      overflow={"hidden"}
      bg="black"
      flexDir={"column"}
    >
      <Box minH="calc(100% - 80px)" borderTopRadius={"20px"}>
        <Player
          controls={false}
          playing={isPlay}
          ref={playerRef}
          muted={isMuted}
          autoPlay={true}
          fluid={false}
          width="100%"
          src={video.video}
          height="100%"
        >
          <ControlBar
            className="my-class"
            autoHide={false}
            disableDefaultControls={true}
          ></ControlBar>
          <BigPlayButton position="center" />
        </Player>
      </Box>

      <Flex
        bg="clique.blackGrey"
        overflow={"hidden"}
        mt="auto"
        borderBottomRadius={"20px"}
        flexDir={"column"}
        minH="80px"
        h={"80px"}
        maxH={"80px"}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        {/* progress */}
        <Slider
          aria-label="slider-ex-1"
          defaultValue={0}
          value={
            totalDuration !== 0 ? (currentTimestamp / totalDuration) * 100 : 0
          }
          onChange={(val) => {
            const timestamp = (val * totalDuration) / 100;
            playerRef.current.seek(timestamp);
          }}
        >
          <SliderTrack h="10px" rounded="0" bg="clique.grey">
            <SliderFilledTrack rounded="0" bg="clique.base" />
          </SliderTrack>
        </Slider>

        {/* control */}
        <Control
          currentTimestamp={currentTimestamp}
          totalDuration={totalDuration}
          isMuted={isMuted}
          isPlay={isPlay}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
          setIsMuted={setIsMuted}
          setIsPlay={setIsPlay}
          playerRef={playerRef}
          video={video}
          nextVideoIndex={nextVideoIndex}
          prevVideoIndex={prevVideoIndex}
          currentVideoIndex={currentVideoIndex}
          videoIdsList={videoIdsList}
        />
      </Flex>
    </Flex>
  );
}

export default VideoPlayer;
