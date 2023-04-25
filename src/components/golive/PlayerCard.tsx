import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Color from "@constants/color";
import MuxPlayer from "@mux/mux-player-react/lazy";
import React, { useEffect } from "react";
import { BiCopy } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "redux/app/hooks";
import {
  useEndStreamMutation,
  useStartStreamMutation,
} from "redux/services/livestream/live.service";
import {
  clearStreamDetails,
  setSelectedStream,
  setStreamDetails,
} from "redux/slices/streamSlice";
import EndLiveModal from "./EndLiveModal";

function PlayerCard({ streamDetails, setState }: any) {
  const [isCopied, setIsCopied] = React.useState(false);
  const handleCopy = (e: string) => {
    navigator.clipboard.writeText(e);
    setIsCopied(true);
  };
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  }, [isCopied]);

  const [startStream, startInfo] = useStartStreamMutation();
  const [endStream, endInfo] = useEndStreamMutation();

  const toast = useToast();

  const dispatch = useAppDispatch();
  const streamId = useAppSelector(
    (state) => state?.app?.stream?.streamDetails?.eventId?._id
  );
  const selectedStreamId = useAppSelector(
    (state) => state?.app?.stream?.selectedStream?.eventId?._id
  );

  const handleUpdateStream = async () => {
    if (streamDetails?.status === "not-started") {
      const startRes: any = await startStream(streamDetails?._id);
      if (startRes?.data?.data) {
        toast({
          title: "Stream Started",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        if (streamId === streamDetails?.eventId?._id) {
          dispatch(
            setStreamDetails({
              payload: {
                ...startRes?.data?.data?.livestream,
              },
            })
          );
        } else if (selectedStreamId === streamDetails?.eventId?._id) {
          dispatch(
            setSelectedStream({
              payload: {
                ...startRes?.data?.data?.livestream,
              },
            })
          );
        }
      } else {
        toast({
          title: "Error",
          description: startRes?.error?.data?.message ?? "Something went wrong",
          status: "error",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      const endRes: any = await endStream(streamDetails?.eventId?._id);
      if (endRes?.data?.data) {
        toast({
          title: "Stream Ended",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        if (streamId === streamDetails?.eventId?._id) {
          dispatch(clearStreamDetails());
        } else if (selectedStreamId === streamDetails?.eventId?._id) {
          setState("liveevent");
        }
      } else {
        toast({
          title: "Error",
          description: endRes?.error?.data?.message ?? "Something went wrong",
          status: "error",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };
  const value = useColorModeValue("clique.white", "clique.secondaryGrey1");
  return (
    <Box w={{ base: "full", lg: "450px" }} maxW="450px" rounded={"10px"}>
      <Box h="300px">
        <MuxPlayer
          style={{ height: "100%", maxWidth: "100%" }}
          placeholder={
            streamDetails?.eventId?.thumbNails &&
            streamDetails?.eventId?.thumbNails[0]
          }
          // playbackId={streamDetails?.playbackId}
          src={`https://stream.mux.com/${streamDetails?.playbackId}.m3u8`}
          metadata={{
            video_id: streamDetails?.eventId?._id,
            video_title: streamDetails?.eventId?.title,
            viewer_user_id: streamDetails?.eventId?._id,
          }}
          streamType="ll-live"
          autoPlay
          muted={false}
        />
      </Box>
      <Box roundedBottom={"10px"} bg={value} px="15px" pt="10px" pb="30px">
        <Text
          position={"relative"}
          color={Color().blackAndWhite}
          fontFamily={"Poppins"}
          fontWeight={500}
          textTransform={"capitalize"}
          fontSize="smSubHead"
        >
          Live Link
        </Text>
        <HStack justifyContent={"space-between"}>
          <Text
            position={"relative"}
            color={"clique.primaryBlue"}
            fontFamily={"Poppins"}
            fontWeight={500}
            fontSize="smSubHead"
          >
            {`${process.env.NEXT_PUBLIC_FEURL}`}stream/
            <Text as="span"> {streamDetails?._id}</Text>
          </Text>

          <Button
            onClick={() => {
              handleCopy(
                `${process.env.NEXT_PUBLIC_FEURL}stream/${streamDetails?.eventId?._id}`
              );
            }}
            _hover={{
              bg: "none",
            }}
            bg="none"
            fontSize={"sm"}
          >
            {isCopied ? "Copied" : <Icon fontSize={"sm2"} as={BiCopy} />}
          </Button>
        </HStack>
        <Text
          mt="10px"
          position={"relative"}
          color={"clique.secondaryGrey2"}
          fontFamily={"Poppins"}
          fontWeight={500}
          textTransform={"capitalize"}
          fontSize="smSubHead"
        >
          Title
        </Text>
        <Text
          position={"relative"}
          color={Color().blackAndWhite}
          fontFamily={"Poppins"}
          fontWeight={500}
          fontSize="smSubHead"
          textTransform={"uppercase"}
        >
          {streamDetails?.eventId?.title}
        </Text>
        <Text
          mt="10px"
          position={"relative"}
          color={"clique.secondaryGrey2"}
          fontFamily={"Poppins"}
          fontWeight={500}
          textTransform={"capitalize"}
          fontSize="smSubHead"
        >
          Description
        </Text>
        <Text
          position={"relative"}
          color={Color().blackAndWhite}
          fontFamily={"Poppins"}
          fontWeight={500}
          fontSize="smSubHead"
          textTransform={"uppercase"}
        >
          {streamDetails?.eventId?.description}
        </Text>

        <Flex alignItems={"center"} justifyContent="space-between" pr="50px">
          <Box>
            <Text
              mt="10px"
              color={"clique.secondaryGrey2"}
              fontFamily={"Poppins"}
              fontWeight={500}
              fontSize="smSubHead"
              textAlign={"center"}
            >
              Views
            </Text>
            <Text
              textAlign={"center"}
              color={Color().blackAndWhite}
              fontFamily={"Poppins"}
              fontWeight={500}
              fontSize="smSubHead"
              textTransform={"uppercase"}
            >
              {streamDetails?.viewsCount}
            </Text>
          </Box>
          <Box>
            <Text
              mt="10px"
              position={"relative"}
              textAlign={"center"}
              color={"clique.secondaryGrey2"}
              fontFamily={"Poppins"}
              fontWeight={500}
              fontSize="smSubHead"
            >
              Likes
            </Text>
            <Text
              position={"relative"}
              color={Color().blackAndWhite}
              textAlign={"center"}
              fontFamily={"Poppins"}
              fontWeight={500}
              fontSize="smSubHead"
              textTransform={"uppercase"}
            >
              {streamDetails?.likesCount}
            </Text>
          </Box>
          <Box>
            <Text
              mt="10px"
              textAlign={"center"}
              color={"clique.secondaryGrey2"}
              fontFamily={"Poppins"}
              fontWeight={500}
              fontSize="smSubHead"
            >
              Dislikes
            </Text>
            <Text
              textAlign={"center"}
              color={Color().blackAndWhite}
              fontFamily={"Poppins"}
              fontWeight={500}
              fontSize="smSubHead"
              textTransform={"uppercase"}
            >
              {streamDetails?.dislikesCount}
            </Text>
          </Box>
        </Flex>
        <Flex w="full" justifyContent={"center"}>
          {streamDetails?.status === "not-started" ? (
            <Button
              mt="80px"
              rounded="full"
              onClick={() => {
                handleUpdateStream();
              }}
              isLoading={startInfo.isLoading || endInfo.isLoading}
              isDisabled={
                startInfo.isLoading ||
                endInfo.isLoading ||
                streamDetails?.status === "ended" ||
                !streamDetails
              }
              bg={"clique.green"}
              color="white"
              colorScheme={"green"}
              fontFamily={"Poppins"}
            >
              Start Live Stream
            </Button>
          ) : streamDetails?.status === "ongoing" ? (
            <EndLiveModal
              streamDetails={streamDetails}
              handleClick={handleUpdateStream}
              loading={startInfo.isLoading || endInfo.isLoading}
            />
          ) : (
            <Button
              mt="80px"
              rounded="full"
              isDisabled={true}
              bg={"clique.grey"}
              color={Color().blackAndWhite}
              colorScheme={"gray"}
              fontFamily={"Poppins"}
            >
              Not available
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

export default PlayerCard;
