import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import moment from "moment";

function EventsCard({ onOpen, event }: any) {
  return (
    <Box
      onClick={onOpen}
      cursor="pointer"
      maxH={"298px"}
      minH={"298px"}
      bg={`url(${event?.eventId?.thumbNails[0]})`}
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      borderRadius={"10px"}
      position={"relative"}
      mt="10px"
    >
      <Flex
        position={"absolute"}
        bottom={0}
        w={"100%"}
        px="10px"
        py="10px"
        alignItems={"center"}
        justifyContent={"space-between"}
        rounded={"10px"}
        backdropFilter={"blur(8.62963px)"}
        bg="linear-gradient(151.47deg, rgba(0, 0, 0, 0.71) -17.86%, rgba(186, 159, 0, 0.56) 217.73%)"
      >
        <Text
          maxW={"35%"}
          noOfLines={1}
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"smSubHead"}
          lineHeight={"1.2"}
          mr="5px"
        >
          {event?.eventId?.title}
        </Text>
        <Text
          pos={"relative"}
          _before={{
            content: '""',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: 0,
            width: "4px",
            background: "clique.base",
            height: "4px",
            rounded: "full",
          }}
          _after={{
            content: '""',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: 0,
            width: "4px",
            background: "clique.base",
            height: "4px",
            rounded: "full",
          }}
          px="10px"
          noOfLines={2}
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"smSubHead"}
          lineHeight={"1.2"}
        >
          {moment(event?.eventId?.schedule).format("MMM Do ")}
        </Text>{" "}
        <Text
          pos={"relative"}
          pl="10px"
          noOfLines={2}
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"smSubHead"}
          lineHeight={"1.2"}
        >
          {moment(event?.eventId?.schedule).format("h a")}
        </Text>
      </Flex>
    </Box>
  );
}

export default EventsCard;
