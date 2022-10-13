import { Button, HStack } from "@chakra-ui/react";
import React from "react";

function TagSection() {
  return (
    <HStack
      py="10px"
      position={"sticky"}
      top="0"
      bg="#171717"
      alignItems={"center"}
      maxW="100%"
    >
      <Button
        variant="ghost"
        rounded={"full"}
        bg="clique.base"
        fontFamily={"Poppins"}
        size={"sm"}
        px="20px"
        fontWeight={400}
        color={"black"}
      >
        All
      </Button>
      <Button
        variant="ghost"
        rounded={"full"}
        bg="#434343"
        fontFamily={"Poppins"}
        size={"sm"}
        fontWeight={400}
        px="20px"
        color={"white"}
      >
        Entertainment
      </Button>
    </HStack>
  );
}

export default TagSection;
