import React from "react";

import {
  CheckboxIcon,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import AvataWithSpace from "@components/widgets/AvataWithSpace";

function NewComment({
  handleComment,
  setComment,
  comment,
  postInfo,
}: {
  handleComment: () => void;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  comment: string;
  postInfo: any;
}) {
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              handleComment();
            }
          }}
        />
        <InputRightElement
          cursor={"pointer"}
          h="100%"
          roundedRight="10px"
          bg="clique.ashGrey"
          onClick={handleComment}
        >
          {postInfo.isLoading ? (
            <Spinner />
          ) : (
            <Image w="25px" src="/assets/inputIcon.svg" alt="icon" />
          )}
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}

export default NewComment;
