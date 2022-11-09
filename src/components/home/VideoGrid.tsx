import React from "react";

import { SimpleGrid } from "@chakra-ui/react";

import VideoThumb from "./VideoThumb";

function VideoGrid({
  width,
  videos,
  thumbWidth,
}: {
  width: string;
  videos:Array<any>;
  thumbWidth?: any
}) {
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 3, mlg: 3, xl: 4 }}
      mt="20px"
      w={width}
      spacing={"30px"}
    >
      {videos.map((video, i) => (
        <VideoThumb
          id={`${i + 1}`}
          imgUrl={video.thumbnail}
          key={video}
          length={videos.length}
          thumbWidth={thumbWidth}
          isSubscribed={i % 2 === 0}
        />
      ))}
    </SimpleGrid>
  );
}

export default VideoGrid;
