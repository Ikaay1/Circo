import HomeLayout from 'layouts/HomeLayout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppSelector } from 'redux/app/hooks';
import {
	useCreateViewMutation,
	useGetContentQuery,
} from 'redux/services/content.service';
import { useGetUserQuery } from 'redux/services/user.service';

import { Box, Flex, useToast } from '@chakra-ui/react';
import CliqueLoader from '@components/home/CliqueLoader';
import CommentSection from '@components/player/CommentSection';
import VideoDetails from '@components/player/VideoDetails';
import VideoPlayer from '@components/player/VideoPlayer';

function Index() {
  const toast = useToast();
  const router = useRouter();
  const {id, userId} = router.query;
  const {data, isLoading, refetch, error} = useGetContentQuery<any>(id);
  const {data: userData, isFetching, isError} = useGetUserQuery(userId);
  const [view] = useCreateViewMutation();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);

  useEffect(() => {
    if (error) {
      toast({
        title: error?.data?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      router.push('/home');
    } else {
      console.log('data', data);
    }
  }, [data, error]);

  useEffect(() => {
    if (data && !data?.data?.preference?.video?.isFree) {
      if (userData && userData?.data?._id !== userProfile?._id) {
        if (
          !userData?.data?.subscribers?.find(
            (subscriber: {_id: string}) => subscriber._id === userProfile._id,
          )
        ) {
          toast({
            title: 'You are not subscribed to this content uploader',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
          setTimeout(() => {
            window.location.replace('/home');
          }, 1000);
        }
      }
    }
  }, [userData, userProfile?._id]);

  useEffect(() => {
    const createView = async () => {
      await view({video_id: data.data.preference.video._id});
    };
    if (data) {
      if (data.data.preference.video.uploader_id._id !== userProfile?._id) {
        createView();
      }
    }
  }, [data, view, userProfile?._id, refetch]);

  return (
    <>
      {isLoading ||
        (!userData && (
          <Box h='90vh'>
            <CliqueLoader />
          </Box>
        ))}
      {userData && !isLoading && !isFetching && data?.data && (
        <HomeLayout>
          <Box display={{lg: 'flex'}}>
            <Box
              maxH={'90vh'}
              pb={{base: '30px', lg: '50px'}}
              px={{base: '20px', lg: '30px'}}
              maxW={{base: '100%', lg: 'calc(100vw - 400px)'}}
              w={{base: '100%', lg: 'calc(100vw - 400px)'}}
              overflowY={'scroll'}
              overflowX={'hidden'}
              sx={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                  rounded: 'full',
                },
                '&::-webkit-scrollbar-track': {
                  boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                  webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                },
                '&::-webkit-scrollbar-thumb': {
                  bg: 'clique.primaryBg',
                  outline: 'none',
                },
              }}
            >
              <VideoPlayer
                video={data?.data?.preference?.video}
                videoIdsList={data?.data?.preference?.allVideos}
              />
              <VideoDetails
                video={data?.data?.preference?.video}
                subscribers={
                  data?.data?.preference?.video?.uploader_id?.subscribers
                }
              />
            </Box>
            {/* @ts-ignore */}
            <CommentSection id={id} />
          </Box>
        </HomeLayout>
      )}
    </>
  );
}

export default Index;
