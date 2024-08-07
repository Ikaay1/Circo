import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import dayjs from "dayjs";
import { useAppDispatch } from "redux/app/hooks";
import { setSelectedStream } from "redux/slices/streamSlice";
import { useRouter } from "next/router";
import Color from "@constants/color";

function EventCard({ event, setState }: any) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <Flex
      onClick={() => {
        if (event?.space) {
          router.push(
            `/stream/webcam/${event?.eventId?._id}/?streamKey=${event?.streamKey}&spaceId=${event?.space?.id}&token=${event?.token}&muxStreamId=${event?.muxStreamId}&broadcastId=${event?.broadcast?.id}`
          );
          return;
        }
        dispatch(
          setSelectedStream({
            payload: { ...event },
          })
        );
        setState("viewevent");
      }}
      cursor="pointer"
      alignItems={"center"}
      mt="20px"
      bg={useColorModeValue("clique.white", "clique.blackGrey")}
      p="10px"
      rounded={"5px"}
    >
      <Box
        w="80px"
        h="80px"
        bg={Color().whiteAndBlack}
        bgImage={`url(${event?.eventId?.thumbNails[0]})`}
        rounded={"5px"}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        mr="10px"
      />

      <Box>
        <Text
          color={Color().blackAndWhite}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"16px"}
        >
          {event?.eventId?.title}
        </Text>
        <Text
          noOfLines={2}
          color={"clique.darkGrey"}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"14px"}
          lineHeight={"1.2"}
          my="7px"
        >
          {event?.eventId?.category}
        </Text>
        <Text
          noOfLines={2}
          color={"clique.darkGrey"}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"14px"}
          lineHeight={"1.2"}
        >
          {dayjs(event?.eventId?.schedule)?.format("DD MMM YY hh:mm A")}
        </Text>
      </Box>
    </Flex>
  );
}

export default EventCard;
