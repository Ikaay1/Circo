import {useRouter} from 'next/router';
import React, {useCallback, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from 'redux/app/hooks';
import {useGetUserQuery} from 'redux/services/user.service';
import {setUser} from 'redux/slices/authSlice';

import {SimpleGrid} from '@chakra-ui/react';

import {contentData} from '../../constants/utils';
import VideoThumb from './VideoThumb';

function VideoGrid({
  width,
  videos,
  thumbWidth,
  lastElementRef,
  setContents,
}: {
  width: string;
  videos: contentData[];
  thumbWidth?: any;
  lastElementRef?: any;
  setContents?: any;
}) {
  const {userProfile} = useAppSelector((store) => store?.app?.userReducer);
  const router = useRouter();
  const {data, refetch} = useGetUserQuery(userProfile?._id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(
        setUser({
          payload: data.data,
        }),
      );
    }
  }, [data]);

  return (
    <>
      <SimpleGrid
        columns={{base: 1, lg: 3, mlg: 3, xl: 4}}
        mt='20px'
        w={{base: '100%', lg: width}}
        spacing={'30px'}
      >
        {videos?.map((video, i) => {
          if (videos.length === i + 1) {
            return (
              <>
                <VideoThumb
                  video={video}
                  key={video._id}
                  thumbWidth={thumbWidth}
                  isSubscribed={
                    video.uploader_id?._id === userProfile?._id || video?.isFree
                      ? true
                      : video?.uploader_id?.subscribers?.find(
                          (theId) => theId === userProfile?._id,
                        )
                      ? true
                      : false
                  }
                  lastElementRef={lastElementRef}
                  setContents={setContents}
                  refetch={refetch}
                />
              </>
            );
          } else {
            return (
              <>
                <VideoThumb
                  video={video}
                  key={video._id}
                  thumbWidth={thumbWidth}
                  isSubscribed={
                    video.uploader_id?._id === userProfile?._id || video?.isFree
                      ? true
                      : video?.uploader_id?.subscribers?.find(
                          (theId) => theId === userProfile?._id,
                        )
                      ? true
                      : false
                  }
                  setContents={setContents}
                  refetch={refetch}
                />
              </>
            );
          }
        })}
      </SimpleGrid>
    </>
  );
}

export default VideoGrid;
