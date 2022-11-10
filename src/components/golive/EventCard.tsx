import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

function EventCard() {
  return (
    <Flex
      alignItems={"center"}
      mt="20px"
      bg="clique.blackGrey"
      p="10px"
      rounded={"5px"}
    >
      <Box
        w="80px"
        h="80px"
        bg="clique.base"
        rounded={"5px"}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        mr="10px"
      />

      <Box>
        <Text
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"16px"}
        >
          What’s New in the 2023 Volkswagen Arteon, the pro’s and cons of our
          fav german auto
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
          Entertainment
        </Text>
        <Text
          noOfLines={2}
          color={"clique.darkGrey"}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"14px"}
          lineHeight={"1.2"}
        >
          Dec 12, 2021 | 10:00 AM
        </Text>
      </Box>
    </Flex>
  );
}

export default EventCard;
