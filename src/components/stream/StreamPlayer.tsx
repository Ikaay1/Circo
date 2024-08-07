import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { useAppSelector } from "redux/app/hooks";
import {
  useDislikeStreamMutation,
  useLikeStreamMutation,
} from "redux/services/livestream/live.service";

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import MuxPlayer from "@mux/mux-player-react";

function StreamPlayer({ stream }: any) {
  const { userProfile } = useAppSelector((store) => store.app.userReducer);

  const [likeStream, info] = useLikeStreamMutation();

  return (
    <Flex
      pos={"relative"}
      h={{ base: "400px", lg: "580px" }}
      maxH={{ base: "400px", lg: "580px" }}
      borderRadius={{ base: "10px", lg: "20px" }}
      id="video"
      overflow={"hidden"}
      bg="black"
      flexDir={"column"}
    >
      <MuxPlayer
        style={{ height: "87%", maxWidth: "100%" }}
        onError={(err) => {
          console.log(err);
        }}
        placeholder={
          stream?.eventId?.thumbNails && stream?.eventId?.thumbNails[0]
        }
        playbackId={stream?.playbackId}
        // src={`https://stream.mux.com/${stream?.playbackId}.m3u8`}
        metadata={{
          video_id: stream?.eventId?._id,
          video_title: stream?.eventId?.title,
          viewer_user_id: stream?.eventId?._id,
        }}
        streamType="ll-live"
        autoPlay
        muted={false}
      />

      <Grid
        bg="clique.blackGrey"
        h="13%"
        templateColumns="repeat(7, 1fr)"
        gap={4}
      >
        <GridItem colSpan={7}>
          <Flex alignItems="center" w="full" h="full" justifyContent={"center"}>
            <Flex
              w="200px"
              ml="30px"
              justifyContent={"center"}
              alignItems={"center"}
            >
              {info.isLoading ? (
                <Spinner size={"sm"} mr="5px" bg="clique.base" />
              ) : (
                <Flex
                  flexDir="column"
                  justify={"center"}
                  cursor={"pointer"}
                  alignItems={"center"}
                >
                  <Box
                    onClick={async () => {
                      await likeStream({
                        streamId: stream._id,
                      });
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
              )}

              {/* {info2.isLoading ? (
                <Spinner size={"sm"} mr="5px" bg="clique.base" />
              ) : (
                <Flex
                  flexDir="column"
                  justify={"center"}
                  cursor={"pointer"}
                  mx="10px"
                  alignItems={"center"}
                >
                  <Box
                    onClick={async () => {
                      await dislikeStream({
                        streamId: stream._id,
                      });
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
              )} */}
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default StreamPlayer;
