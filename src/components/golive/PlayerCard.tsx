import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import React, { useEffect } from "react";
import { BiCopy } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "redux/app/hooks";
import {
  useEndStreamMutation,
  useStartStreamMutation,
} from "redux/services/live.service";
import { clearStreamDetails, setSelectedStream, setStreamDetails } from "redux/slices/streamSlice";

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
    (state) => state?.app?.stream?.streamDetails?._id
  );
  const selectedStreamId = useAppSelector(
    (state) => state?.app?.stream?.selectedStream?._id
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
        if (streamId === selectedStreamId) {
          dispatch(
            setStreamDetails({
              payload: {
                ...startRes?.data?.data?.livestream,
              },
            })
          );
        } else if (selectedStreamId === streamDetails?._id) {
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
      const endRes: any = await endStream(streamDetails?._id);
      if (endRes?.data?.data) {
        toast({
          title: "Stream Ended",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        if (streamId === streamDetails?._id) {
          dispatch(clearStreamDetails());
        } else if (selectedStreamId === streamDetails?._id) {
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

  return (
    <Box w="400px" maxW="400px" rounded={"10px"}>
      <Box h="300px">
        <MuxPlayer
          style={{ height: "100%", maxWidth: "100%" }}
          placeholder={
            streamDetails?.eventId?.thumbNails &&
            streamDetails?.eventId?.thumbNails[0]
          }
          playbackId={streamDetails?.playbackId}
          metadata={{
            video_id: streamDetails?.eventId?._id,
            video_title: streamDetails?.eventId?.title,
            viewer_user_id: streamDetails?.eventId?._id,
          }}
          streamType="live:dvr"
          autoPlay
          muted
          loading="page"
        />
      </Box>
      <Box
        roundedBottom={"10px"}
        bg="clique.secondaryGrey1"
        px="15px"
        pt="10px"
        pb="30px"
      >
        <Text
          position={"relative"}
          color={"clique.white"}
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
            textTransform={"capitalize"}
            fontSize="smSubHead"
          >
            https://clique.com/8u6yt26f
          </Text>

          <Button
            onClick={() => {
              handleCopy("https://clique.com/8u6yt26f");
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
          color={"clique.white"}
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
          Title
        </Text>
        <Text
          position={"relative"}
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={500}
          fontSize="smSubHead"
          textTransform={"uppercase"}
        >
          {streamDetails?.eventId?.title}
        </Text>
        <Flex w="full" justifyContent={"center"}>
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
            bg={
              streamDetails?.status === "not-started"
                ? "clique.green"
                : "clique.dangerRed"
            }
            color="white"
            colorScheme={
              streamDetails?.status === "not-started" ? "green" : "red"
            }
            fontFamily={"Poppins"}
          >
            {streamDetails?.status === "not-started" ? "Start" : "End"} Live
            Stream
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default PlayerCard;
