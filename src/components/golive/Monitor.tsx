import { Flex } from "@chakra-ui/react";
import React from "react";
import CommentSection from "./CommentSection";
import PlayerCard from "./PlayerCard";

function Monitor({ streamDetails }: any) {
  return (
    <Flex justifyContent={"space-between"} h="80vh">
      <PlayerCard streamDetails={streamDetails} />
      <CommentSection id={""} />
    </Flex>
  );
}

export default Monitor;
