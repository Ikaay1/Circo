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

function VideoPlayer({ video }: { video: contentData }) {
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
      h={"580px"}
      maxH={"580px"}
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
        />
      </Flex>
    </Flex>
  );
}

export default VideoPlayer;
