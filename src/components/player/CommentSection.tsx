import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";
import EachComment from "./EachComment";

function CommentSection() {
  return (
    <Box
      w="400px"
      maxW="400px"
      p="20px"
      minW="400px"
      bg="clique.black"
      h="90vh"
      minH="90vh"
      maxH="90vh"
      py={"20px"}
      overflowY="scroll"
      sx={{
        "&::-webkit-scrollbar": {
          width: "4px",
          rounded: "full",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          bg: "clique.grey",
          outline: "none",
        },
      }}
    >
      <Text
        textAlign={"left"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize="20px"
      >
        Comments
      </Text>

      <EachComment />
      <EachComment />
      <EachComment />
      <EachComment />
      <EachComment />
    </Box>
  );
}

export default CommentSection;
