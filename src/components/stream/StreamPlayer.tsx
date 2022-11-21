import { Box, Flex, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import React from "react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import Control from "@components/player/Control";
import { BiDislike, BiLike } from "react-icons/bi";
import { useAppSelector } from "redux/app/hooks";
import {
  useDislikeStreamMutation,
  useLikeStreamMutation,
} from "redux/services/livestream/live.service";
const Nprogress = require("nprogress");

function StreamPlayer({ stream }: any) {
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const [likeStream, info] = useLikeStreamMutation();
  const [dislikeStream, info2] = useDislikeStreamMutation();

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
        style={{ height: "87%", maxWidth: "100%" }}
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

      <Grid
        bg="clique.blackGrey"
        h="13%"
        templateColumns="repeat(7, 1fr)"
        gap={4}
      >
        <GridItem colSpan={7}>
          <Flex alignItems="center" w="full" h="full" justifyContent={"center"}>
            <Flex ml="30px" alignItems={"center"}>
              <Flex
                flexDir="column"
                justify={"center"}
                cursor={"pointer"}
                alignItems={"center"}
              >
                <Box
                  onClick={async () => {
                    Nprogress.start();
                    await likeStream({
                      streamId: stream._id,
                    });
                    Nprogress.done();
                  }}
                >
                  <Icon
                    color={
                      stream?.likes?.includes(userProfile?._id)
                        ? "clique.base"
                        : "clique.white"
                    }
                    mr="5px"
                    fontSize="head"
                    as={BiLike}
                  />
                </Box>
                <Text
                  color={"clique.white"}
                  fontFamily={"Poppins"}
                  fontWeight={400}
                  fontSize={"smSubHead"}
                  lineHeight={"1.2"}
                >
                  {stream?.likesCount}
                </Text>
              </Flex>

              <Flex
                flexDir="column"
                justify={"center"}
                cursor={"pointer"}
                mx="10px"
                alignItems={"center"}
              >
                <Box
                  onClick={async () => {
                    Nprogress.start();
                    await dislikeStream({
                      streamId: stream._id,
                    });
                    Nprogress.done();
                  }}
                >
                  <Icon
                    color={
                      stream?.dislikes.includes(userProfile?._id)
                        ? "clique.base"
                        : "clique.white"
                    }
                    mr="5px"
                    fontSize=" head"
                    as={BiDislike}
                  />
                </Box>
                <Text
                  color={"clique.white"}
                  fontFamily={"Poppins"}
                  fontWeight={400}
                  fontSize={"smSubHead"}
                  lineHeight={"1.2"}
                >
                  {stream?.dislikesCount}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default StreamPlayer;
