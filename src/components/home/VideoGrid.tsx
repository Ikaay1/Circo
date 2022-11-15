import React from 'react';
import { useAppSelector } from 'redux/app/hooks';

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
  const {userProfile} = useAppSelector((store) => store?.app?.userReducer);
  return (
    <SimpleGrid
      columns={{base: 1, lg: 3, mlg: 3, xl: 4}}
      mt='20px'
      w={width}
      spacing={'30px'}
    >
      {videos?.map((video, i) => (
        <>
          <VideoThumb
            video={video}
            key={video._id}
            thumbWidth={thumbWidth}
            isSubscribed={
              video.uploader_id?._id === userProfile?._id
                ? true
                : video?.uploader_id?.subscribers?.find(
                    (theId) => theId === userProfile?._id,
                  )
                ? true
                : false
            }
          />
        </>
      ))}
    </SimpleGrid>
  );
}

export default VideoGrid;
