import { Flex } from "@chakra-ui/react";
import React from "react";
import CommentSection from "./CommentSection";
import PlayerCard from "./PlayerCard";

function Monitor({ streamDetails, setState }: any) {
  return (
    <Flex
      justifyContent={"space-between"}
      flexDir={{ base: "column", lg: "row" }}
    >
      <PlayerCard setState={setState} streamDetails={streamDetails} />
      <CommentSection streamDetails={streamDetails} />
    </Flex>
  );
}

export default Monitor;
