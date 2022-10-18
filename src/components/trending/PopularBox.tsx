import { Box, Text } from "@chakra-ui/react";
import React from "react";

function PopularBox() {
  return (
    <Box minW={"30%"} maxW="30%" h="100%">
      <Text
        position={"relative"}
        pl="20px"
        _before={{
          content: '""',
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: 0,
          width: "6px",
          height: "25px",
          background: "clique.base",
          borderRightRadius: "4px",
        }}
        color={"clique.white"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize="25px"
        lineHeight={"1"}
      >
        Popular Creators
      </Text>

      <Text
        mt="50px"
        position={"relative"}
        pl="20px"
        _before={{
          content: '""',
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: 0,
          width: "6px",
          height: "25px",
          background: "clique.base",
          borderRightRadius: "4px",
        }}
        color={"clique.white"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize="25px"
        lineHeight={"1"}
      >
        Top Searches
      </Text>
    </Box>
  );
}

export default PopularBox;
