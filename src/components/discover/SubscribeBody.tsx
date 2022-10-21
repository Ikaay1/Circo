import { Flex, Text } from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";
import React from "react";

function SubscribeBody() {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"start"}
      justifyContent="space-between"
      h="220px"
      w="full"
      bgImage={"/assets/temsimg.png"}
      bgSize="cover"
      bgPosition={"center"}
      bgRepeat="no-repeat"
      rounded={"20px"}
      px="30px"
      py="10px"
    >
      <Flex>
        <Flex justifyContent={"center"} alignItems="center" flexDir={"column"}>
          <AvataWithSpace
            name="Prosper Otemuyiwa"
            url="https://bit.ly/prosper-baba"
            size="45px"
            borderColor="clique.brown"
            borderThickness="3px"
          />

          <Text
            mt="5px"
            fontFamily={"Poppins"}
            fontSize="smSubHead"
            color={"clique.white"}
          >
            Emma
          </Text>
        </Flex>
      </Flex>
      <Flex mt="5px" alignItems={"center"} justifyContent="space-between">
        <Text
          noOfLines={2}
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"subHead"}
          lineHeight={"1.2"}
          mr="10px"
          w="55%"
        >
          Why my style of music is Afrofusion, not Afrobeats
        </Text>
        <Text
          pos={"relative"}
          pl="10px"
          noOfLines={2}
          color={"clique.white"}
          fontFamily={"Poppins"}
          fontWeight={400}
          fontSize={"subHead"}
          lineHeight={"1.2"}
        >
          - Burnaboy
        </Text>
      </Flex>
    </Flex>
  );
}

export default SubscribeBody;
