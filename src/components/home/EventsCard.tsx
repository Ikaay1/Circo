import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import moment from "moment";

function EventsCard({ onOpen, event }: any) {
  return (
    <Box
      onClick={onOpen}
      cursor="pointer"
      maxH={"250px"}
      minH={"250px"}
      bg={`url(${event?.eventId?.thumbNails[0]})`}
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      borderRadius={"17px"}
      position={"relative"}
      mt="10px"
    >
      <Box
        position={"absolute"}
        bottom={0}
        w={"100%"}
        px="20px"
        py="10px"
        alignItems={"center"}
        justifyContent={"space-between"}
        rounded={"17px"}
        backdropFilter={"blur(15px)"}
        bg="linear-gradient(180deg, #892CDC 0%, rgba(0, 0, 0, 0) 172.12%)"
      >
        <Flex alignItems={"flex-end"} mb="3px">
          <Flex
            flexShrink={0}
            onClick={() => {}}
            cursor="pointer"
            alignItems={"center"}
            justifyContent="center"
            p="2px"
            mr="5px"
            rounded="full"
            background="linear-gradient(144.09deg, #892CDC 12.14%, #6E93F1 89.06%)"
          >
            <Avatar
              p="0"
              size="xs"
              w={"20px"}
              h={"20px"}
              name={event?.streamerId?.name}
              src={event?.streamerId?.photo}
            />
          </Flex>
          <Text
            noOfLines={1}
            color={"clique.white"}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"12px"}
            lineHeight={"1.5"}
          >
            {event?.streamerId?.name}
          </Text>
        </Flex>
        <Text
          maxW={"100%"}
          noOfLines={1}
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"smSubHead"}
          lineHeight={"1.5"}
        >
          {event?.eventId?.title}
        </Text>
        <Flex>
          <Text
            pos={"relative"}
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
            pr="10px"
            noOfLines={2}
            color={"clique.white"}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"smSubHead"}
            lineHeight={"1.2"}
          >
            {moment(event?.eventId?.schedule).format("MMMM D ")}
          </Text>
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
    </Box>
  );
}

export default EventsCard;
