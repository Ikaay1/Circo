import {
  CheckboxIcon,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";
import React from "react";

function NewComment() {
  return (
    <Flex
      pos={"fixed"}
      bottom="0"
      right={"0"}
      px="20px"
      bg="clique.black"
      py="20px"
      w="400px"
    >
      <AvataWithSpace
        name="Prosper Otemuyiwa"
        url="https://bit.ly/prosper-baba"
        mr="20px"
        size="40px"
        borderThickness="2px"
        borderColor="clique.base"
      />

      <InputGroup>
        <Input
          rounded={"10px"}
          p="5px"
          px="10px"
          color={"clique.white"}
          fontSize={"smSubHead"}
          _placeholder={{
            color: "clique.white",
            fontSize: "smSubHead",
          }}
          placeholder="Enter Comment..."
          bg="clique.ashGrey"
          border={"none"}
          _focus={{ border: "none", boxShadow: "none" }}
        />
        <InputRightElement
          cursor={"pointer"}
          h="100%"
          roundedRight="10px"
          bg="clique.ashGrey"
        >
          <Image w="25px" src="/assets/inputIcon.svg" alt="icon" />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}

export default NewComment;
