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
      <VideoThumb id={"1"} imgUrl="/videoImg.png" />
      <VideoThumb id={"2"} imgUrl="/videoImg2.png" />
      <VideoThumb id={"3"} imgUrl="/videoImg3.png" />{" "}
      <VideoThumb id={"4"} imgUrl="/videoImg.png" />
      <VideoThumb id={"5"} imgUrl="/videoImg2.png" />
      <VideoThumb id={"6"} imgUrl="/videoImg3.png" />
    </SimpleGrid>
  );
}

export default VideoGrid;
