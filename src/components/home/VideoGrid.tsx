import React from "react";

import { SimpleGrid } from "@chakra-ui/react";

import VideoThumb from "./VideoThumb";

function VideoGrid({ width, videos }: { width: string; videos: string[] }) {
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 3, mlg: 3, xl: 4 }}
      //   autoColumns={"300px"}
      mt="20px"
      w={width}
      spacing={"30px"}
    >
      {[...videos, ...videos].map((video, i) => (
        <VideoThumb
          id={`${i + 1}`}
          imgUrl={`/${video}.png`}
          key={video}
          length={videos.length}
        />
      ))}
    </SimpleGrid>
  );
}

export default VideoGrid;
