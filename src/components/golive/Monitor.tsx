import { Flex } from "@chakra-ui/react";
import React from "react";
import CommentSection from "./CommentSection";
import PlayerCard from "./PlayerCard";

function Monitor({ streamDetails, setState }: any) {
  return (
    <Flex justifyContent={"space-between"} h="80vh">
      <PlayerCard setState={setState} streamDetails={streamDetails} />
      <CommentSection id={""} />
    </Flex>
  );
}

export default Monitor;
