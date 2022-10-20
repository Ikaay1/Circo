import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

function EventsCard({ onOpen, imgUrl }: any) {
  return (
    <Box onClick={onOpen} cursor="pointer" p="10px">
      <Image
        w="100%"
        src={imgUrl}
        borderTopRadius={"10px"}
        alt="burnaboys event"
      />
      <Flex
        px="10px"
        py="10px"
        alignItems={"center"}
        justifyContent={"space-between"}
        borderBottomRadius={"10px"}
        backdropFilter={"blur(8.62963px)"}
        bg="linear-gradient(151.47deg, rgba(0, 0, 0, 0.71) -17.86%, rgba(186, 159, 0, 0.56) 217.73%)"
      >
        <Text
          noOfLines={2}
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"smSubHead"}
          lineHeight={"1.2"}
          mr="5px"
        >
          BURNABOY
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
          12th Dec
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
          7pm
        </Text>
      </Flex>
    </Box>
  );
}

export default EventsCard;
