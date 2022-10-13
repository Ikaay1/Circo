import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import VideoThumb from "./VideoThumb";

function VideoGrid() {
  return (
    <SimpleGrid
      mt="20px"
      columns={3}
      w="calc(100vw - 560px)"
      spacing={"10px"}
    ></SimpleGrid>
  );
}

export default VideoGrid;
