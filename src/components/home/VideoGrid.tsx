import React from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import { contentData } from '../../constants/utils';
import VideoThumb from './VideoThumb';

function VideoGrid({
  width,
  videos,
  thumbWidth,
}: {
  width: string;
  videos: contentData[];
  thumbWidth?: any;
}) {
  return (
    <SimpleGrid
      columns={{base: 1, lg: 3, mlg: 3, xl: 4}}
      mt='20px'
      w={width}
      spacing={'30px'}
    >
      {videos.map((video, i) => (
        <VideoThumb
          video={video}
          key={video._id}
          length={videos.length}
          thumbWidth={thumbWidth}
          isSubscribed={i % 2 === 0}
        />
      ))}
    </SimpleGrid>
  );
}

export default VideoGrid;
