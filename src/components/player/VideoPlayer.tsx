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
import ReactPlayer from "react-player/lazy";
import moment from "moment";
import { GoUnmute, GoMute } from "react-icons/go";
import { BiLike, BiDislike } from "react-icons/bi";
import { BsPauseFill, BsFillPlayFill, BsFullscreen } from "react-icons/bs";
import PrevIcon from "@icons/PrevIcon";
import NextIcon from "@icons/NextIcon";
import { MdCloseFullscreen } from "react-icons/md";

function VideoPlayer() {
  const [currentTimestamp, setCurrentTimestamp] = React.useState(0);
  const [totalDuration, setTotalDuration] = React.useState(0);
  const [seek, setSeek] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isPlay, setIsPlay] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  return (
    <Box
      h={isFullScreen ? "calc(100vh - 200px)" : "500px"}
      borderTopRadius="20px"
      id="video"
      bg="black"
      p={""}
      mb="120px"
    >
      <Box h="100%">
        <ReactPlayer
          width={"100%"}
          style={{ borderRadius: "20px", margin: "0", padding: 0 }}
          height={"100%"}
          url="https://www.youtube.com/watch?v=cWbbAuaj3b0"
          onClickPreview={() => setIsPlay(!isPlay)}
          muted={isMuted}
          onProgress={(e) => {
            setCurrentTimestamp(e.playedSeconds);
          }}
          onDuration={(e) => {
            setTotalDuration(e);
          }}
          onPlay={() => setIsPlay(true)}
          onEnded={() => setIsPlay(false)}
          playing={isPlay}
        />
      </Box>

      <Slider
        aria-label="slider-ex-1"
        defaultValue={0}
        value={
          totalDuration !== 0 ? (currentTimestamp / totalDuration) * 100 : 0
        }
        onChangeEnd={(val) => {
          const timestamp = (val * totalDuration) / 100;
          setSeek(timestamp);
        }}
      >
        <SliderTrack h="5px" rounded="0" bg="clique.grey">
          <SliderFilledTrack
            rounded="0"
            roundedRight={"full"}
            bg="clique.base"
          />
        </SliderTrack>
      </Slider>
      <Grid
        templateColumns="repeat(7, 1fr)"
        px="30px"
        py="20px"
        borderBottomRadius={"20px"}
        bg="clique.blackGrey"
        gap={4}
      >
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
            {isPlay ? (
              <Icon
                fontSize="35px"
                cursor="pointer"
                as={BsPauseFill}
                onClick={() => setIsPlay(!isPlay)}
                mx="20px"
              />
            ) : (
              <Icon
                fontSize="35px"
                cursor="pointer"
                as={BsFillPlayFill}
                onClick={() => setIsPlay(!isPlay)}
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
    </Box>
  );
}

export default VideoPlayer;
