import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import moment from "moment";
import { GoUnmute, GoMute } from "react-icons/go";
import { BiLike, BiDislike } from "react-icons/bi";
import { BsPauseFill, BsFillPlayFill, BsFullscreen } from "react-icons/bs";
import PrevIcon from "@icons/PrevIcon";
import NextIcon from "@icons/NextIcon";
const { Player, ControlBar } = require("video-react");

function VideoPlayer() {
  const [currentTimestamp, setCurrentTimestamp] = React.useState(0);
  const [totalDuration, setTotalDuration] = React.useState(0);
  const [seek, setSeek] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isPlay, setIsPlay] = React.useState(true);
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const playerRef: any = React.useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.subscribeToStateChange((state: any) => {
        setCurrentTimestamp(state.currentTime);
        setTotalDuration(state.duration);
        setSeek(state.seeking);
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
          height="100%"
        >
          <source src="/videoplayback.mp4" />
          <ControlBar
            className="my-class"
            autoHide={false}
            disableDefaultControls={true}
          ></ControlBar>
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
        <Grid templateColumns="repeat(7, 1fr)" px="30px" py="20px" gap={4}>
          <GridItem colSpan={2}>
            <Flex alignItems="center">
              <Text
                mt="5px"
                minW={"100px"}
                color={"clique.white"}
                fontFamily={"Poppins"}
                fontWeight={400}
                fontSize={"14px"}
                lineHeight={"1"}
                mr="30px"
              >
                {moment(currentTimestamp * 1000).format("mm:ss")} /{" "}
                {moment(totalDuration * 1000).format("mm:ss")}
              </Text>
              {!isMuted ? (
                <Icon
                  fontSize="20px"
                  cursor={"pointer"}
                  onClick={() => setIsMuted(!isMuted)}
                  as={GoUnmute}
                />
              ) : (
                <Icon
                  fontSize="20px"
                  cursor={"pointer"}
                  onClick={() => setIsMuted(!isMuted)}
                  as={GoMute}
                />
              )}{" "}
              <Flex ml="30px" alignItems={"center"}>
                <Flex
                  flexDir="column"
                  justify={"center"}
                  cursor={"pointer"}
                  alignItems={"center"}
                >
                  <Icon
                    color="clique.white"
                    mr="5px"
                    fontSize="25px"
                    as={BiLike}
                  />
                  <Text
                    color={"clique.white"}
                    fontFamily={"Poppins"}
                    fontWeight={400}
                    fontSize={"12px"}
                    lineHeight={"1.2"}
                  >
                    12
                  </Text>
                </Flex>

                <Flex
                  flexDir="column"
                  justify={"center"}
                  cursor={"pointer"}
                  mx="10px"
                  alignItems={"center"}
                >
                  <Icon
                    color="clique.white"
                    mr="5px"
                    fontSize="25px"
                    as={BiDislike}
                  />
                  <Text
                    color={"clique.white"}
                    fontFamily={"Poppins"}
                    fontWeight={400}
                    fontSize={"12px"}
                    lineHeight={"1.2"}
                  >
                    12
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem colSpan={3} justifySelf="center">
            <Flex alignItems="center">
              <Icon fontSize="30px" cursor="pointer" as={PrevIcon} />
              {!isPlay ? (
                <Icon
                  fontSize="35px"
                  cursor="pointer"
                  as={BsPauseFill}
                  onClick={
                    playerRef.current
                      ? () => {
                          playerRef.current.pause();
                          setIsPlay(false);
                        }
                      : () => setIsPlay(!isPlay)
                  }
                  mx="20px"
                />
              ) : (
                <Icon
                  fontSize="35px"
                  cursor="pointer"
                  as={BsFillPlayFill}
                  onClick={
                    playerRef.current
                      ? () => {
                          playerRef.current.play();
                          setIsPlay(true);
                        }
                      : () => setIsPlay(!isPlay)
                  }
                  mx="20px"
                />
              )}
              <Icon fontSize="30px" cursor="pointer" as={NextIcon} />
            </Flex>
          </GridItem>
          <GridItem colSpan={2} justifySelf="end">
            <Flex alignItems="center" h="100%">
              <Icon
                fontSize="20px"
                cursor={"pointer"}
                onClick={() => {
                  setIsFullScreen(!isFullScreen);
                  const video: any = document.getElementById("video");
                  video.requestFullscreen();
                }}
                as={BsFullscreen}
              />
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
}

export default VideoPlayer;
