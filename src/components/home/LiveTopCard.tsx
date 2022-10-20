import { Avatar, Flex, HStack, Text } from "@chakra-ui/react";
import { purpleBoxStyle } from "@constants/utils";
import React from "react";

function LiveTopCard() {
  return (
    <Flex alignItems={"center"} maxW="calc(100vw - 560px)" my="10px">
      <Text
        position={"relative"}
        pl="20px"
        _before={{ ...purpleBoxStyle, background: "clique.base" }}
        color={"clique.white"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize={"subHead"}
      >
        Live
      </Text>
      <HStack px="20px">
        <Flex
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
      </HStack>
    </Flex>
  );
}

export default LiveTopCard;
