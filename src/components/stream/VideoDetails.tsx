import React from "react";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import Color from "@constants/color";

function VideoDetails({ stream }: { stream: any }) {
  return (
    <Box mt="20px">
      <Text
        textAlign={"left"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize="smHead"
      >
        {stream?.eventId?.title}
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
              name={stream?.streamerId?.name ?? "NA"}
              src={stream?.streamerId?.photo}
            />
          </Flex>

          <Box>
            <Text
              noOfLines={2}
              color={Color().blackAndWhite}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize="subHead"
              textTransform={"uppercase"}
              lineHeight={"1.2"}
            >
              {stream?.streamerId?.name ?? "NA"}
            </Text>
            <Text
              mt="5px"
              noOfLines={2}
              color={"clique.darkGrey"}
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize="smSubHead"
              lineHeight={"1.2"}
            ></Text>
          </Box>
        </Flex>
        <Button
          rounded="full"
          fontWeight={400}
          bg={"clique.purple"}
          cursor="pointer"
          onClick={() => console.log("clicked")}
        >
          Subscribed
        </Button>
      </Flex>
      <Text
        mt="5px"
        noOfLines={2}
        color={"clique.darkGrey"}
        fontFamily={"Poppins"}
        fontWeight={400}
        fontSize="smSubHead"
        lineHeight={"1.2"}
      >
        Video Description
      </Text>{" "}
      <Text
        mt="5px"
        color={Color().blackAndWhite}
        fontFamily={"Poppins"}
        fontWeight={400}
        fontSize="smSubHead"
        lineHeight={"1.5"}
        w="70%"
      >
        {stream?.eventId?.description}
      </Text>
    </Box>
  );
}

export default VideoDetails;
