import { Box, Flex, Text } from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";
import React from "react";

function CreatorAvatarBox() {
  return (
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
        color={"clique.lightGrey"}
      >
        Emma
      </Text>
    </Flex>
  );
}

export default CreatorAvatarBox;
