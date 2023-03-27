import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderTrack,
} from "@chakra-ui/react";
import { contentData, createObjectURL, decrypt } from "@constants/utils";

import BigAd from "./BigAd";
import Control from "./Control";
import ControlMobile from "./ControlMobile";
import SmallAd from "./SmallAd";
import VIdeoJsPlayer from "./VIdeoJsPlayer";

const { Player, ControlBar, BigPlayButton } = require("video-react");

function VideoPlayer({
  video,
  videoIdsList,
  url,
}: {
  video: contentData;
  videoIdsList: {
    _id: string;
  }[];
  url: string;
}) {
  const router = useRouter();
  const currentVideoIndex = videoIdsList.findIndex(
    (videoId) => videoId?._id === video._id
  );

  const [nextVideoIndex, setNextVideoIndex] = React.useState<number | null>(
    null
  );

  const [prevVideoIndex, setPrevVideoIndex] = React.useState<number | null>(
    null
  );

  const [isLoop, setIsLoop] = React.useState<any>(
    localStorage.getItem("loop") === "true" ? true : false
  );
  const playerRef: any = React.useRef(null);
  useEffect(() => {
    const length = videoIdsList.length;

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

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.subscribeToStateChange((state: any) => {
        setCurrentTimestamp(state.currentTime);
        setTotalDuration(state.duration);
        setIsPlay(state.paused);
      });
    }
  }, []);

  const [isAd, setIsAd] = React.useState(false);
  const [isSmallAd, setIsSmallAd] = React.useState(false);

  React.useEffect(() => {
    if (moment(currentTimestamp * 1000).format("mm:ss") === "00:00" && isPlay) {
      setIsAd(true);
      setTimeout(() => {
        setIsSmallAd(true);
      }, 5000);
    }
  }, [currentTimestamp]);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    height: "100%",
    aspectRatio: "16:9",
    muted: isMuted,
    sources: [
      {
        src: url,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
  };

  return (
    <>
      <Flex
        pos={"relative"}
        h={{ base: "320px", lg: "500px" }}
        maxH={{ base: "400px", lg: "580px" }}
        borderTopRadius="20px"
        id="video"
        overflow={"hidden"}
        bg="black"
        flexDir={"column"}
      >
        <Box minH="calc(100% - 80px)" borderTopRadius={"20px"}>
          {/* <Player
          controls={false}
          playing={isPlay && !isAd}
          ref={playerRef}
          muted={isMuted}
          // autoPlay={true}
          fluid={false}
          width='100%'
          src={url}
          height='100%'
          onEnded={() => {
            if (isLoop) {
              playerRef.current.seek(0);
              playerRef.current.play();
              return;
            }
            setIsAd(true);
            if (nextVideoIndex !== null) {
              router.push(
                `/player/${videoIdsList[nextVideoIndex]?._id}/${video.uploader_id._id}`,
              );
            }
          }}
        >
          {video?.isFree && isSmallAd && (
            <SmallAd setIsSmallAd={setIsSmallAd} />
          )}
          <ControlBar
            className='my-class'
            autoHide={false}
            disableDefaultControls={true}
          ></ControlBar>
          <BigPlayButton position='center' />
        </Player> */}
          <VIdeoJsPlayer
            controls={false}
            autoplay
            options={videoJsOptions}
            onReady={handlePlayerReady}
            ima={{
              adTagUrl:
                "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
            }}
          />
        </Box>
      </Flex>
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
        <Box display={{ base: "none", lg: "block" }}>
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
            isLoop={isLoop}
            setIsLoop={setIsLoop}
          />
        </Box>

        <Box display={{ lg: "none" }}>
          <ControlMobile
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
        </Box>
      </Flex>
    </>
  );
}

export default VideoPlayer;
