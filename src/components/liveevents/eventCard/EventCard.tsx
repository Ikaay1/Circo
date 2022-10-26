import React from "react";

import { Box, Flex, Text } from "@chakra-ui/react";

function EventCard({ onOpen }: { onOpen: () => void }) {
  return (
    <Flex
      rounded={"10px"}
      alignItems="flex-end"
      h={{ lg: "180px", mlg: "200px" }}
      bg="clique.lightGrey"
      bgImage={"url(/eventFlyer.png)"}
      bgSize={"cover"}
      bgPosition={"center"}
      onClick={() => {
        onOpen();
      }}
      cursor={"pointer"}
    >
      <Box
        bg="clique.blurColor"
        roundedBottom={"10px"}
        backdropFilter=" blur(10px)"
        px="20px"
        py="10px"
        w="full"
        h={"55px"}
      >
        <Text
          noOfLines={1}
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={500}
          fontSize={"smSubHead"}
          lineHeight={"1.2"}
          mr="5px"
        >
          BURNABOY LIVE - EKO HOTEL AND SUITS
        </Text>
        <Text
          noOfLines={2}
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={500}
          fontSize={"smSubHead"}
          lineHeight={"1.2"}
          mt="5px"
        >
          DEC 26 . 6PM
        </Text>
      </Box>
    </Flex>
  );
}

export default EventCard;
