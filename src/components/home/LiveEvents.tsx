import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";
import EventModal from "./EventModal";

function LiveEvents() {
  return (
    <Box
      w="250px"
      maxW="250px"
      minW="250px"
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
        textAlign={"center"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize="20px"
      >
        Live Events
      </Text>{" "}
      <Box px="50px" py="5px">
        <Divider />
      </Box>
      <EventModal />
    </Box>
  );
}

export default LiveEvents;
