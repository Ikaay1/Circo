import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import VideoThumb from "./VideoThumb";

function VideoGrid() {
  return (
    <SimpleGrid
      autoColumns={"300px"}
      mt="20px"
      columns={3}
      w="calc(100vw - 560px)"
      spacing={"30px"}
    >
      <VideoThumb imgUrl="/videoImg.png" />
      <VideoThumb imgUrl="/videoImg2.png" />
      <VideoThumb imgUrl="/videoImg3.png" />
    </SimpleGrid>
  );
}

export default VideoGrid;
