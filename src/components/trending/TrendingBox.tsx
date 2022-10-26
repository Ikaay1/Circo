import { Box, Text } from "@chakra-ui/react";
import { purpleBoxStyle } from "@constants/utils";
import React from "react";
import TrendCard from "./TrendCard";

function TrendingBox() {
  return (
    <Box minW={"70%"} maxW="70%" h="100%">
      <Text
        position={"relative"}
        pl="20px"
        _before={purpleBoxStyle}
        color={"clique.white"}
        fontFamily={"Poppins"}
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize="head"
        lineHeight={"1"}
      >
        Trending
      </Text>

      <TrendCard position="01" />
      <TrendCard position="02" />
      <TrendCard position="03" />
    </Box>
  );
}

export default TrendingBox;
