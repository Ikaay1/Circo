import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

function VideoDetails() {
  return (
    <Box mt="20px">
      <Text
        textAlign={"left"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize="20px"
      >
        I be Boss wey dey do giveaway - Dj Caleb
      </Text>
      <Flex my="10px" justifyContent={"space-between"} alignItems="center">
        <Flex alignItems="center">
          <Flex
            mr="20px"
            alignItems={"center"}
            justifyContent="center"
            p="4px"
            border={"4px solid"}
            borderColor="clique.base"
            rounded="full"
          >
            <Avatar
              p="0"
              size="md"
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
          </Flex>

          <Box>
            <Text
              noOfLines={2}
              color={"clique.white"}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={"16px"}
              lineHeight={"1.2"}
            >
              Engr. Caleb
            </Text>
            <Text
              mt="5px"
              noOfLines={2}
              color={"clique.darkGrey"}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={"14px"}
              lineHeight={"1.2"}
            >
              6M subcribers
            </Text>
          </Box>
        </Flex>
        <Button rounded="full" fontWeight={400} bg="clique.grey">
          Subcribed
        </Button>
      </Flex>
      <Text
        mt="5px"
        noOfLines={2}
        color={"clique.darkGrey"}
        fontFamily={"Poppins"}
        fontWeight={400}
        fontSize={"14px"}
        lineHeight={"1.2"}
      >
        Video Description
      </Text>{" "}
      <Text
        mt="5px"
        color={"clique.white"}
        fontFamily={"Poppins"}
        fontWeight={400}
        fontSize={"14px"}
        lineHeight={"1.5"}
        w="70%"
      >
        This is a documentation based on the life and times of NAT GEO WILD.
        This documentation shows you how they started, their challenges and how
        they have been able to overcome and become the best discovery channel to
        learn about all classes of animals.
      </Text>
    </Box>
  );
}

export default VideoDetails;
