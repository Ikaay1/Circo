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
import { createObjectURL, decrypt, scrollBarStyle3 } from '@constants/utils';

function Index() {
  const toast = useToast();
  const router = useRouter();
  const {id, userId} = router.query;
  const {data, isLoading, refetch, error} = useGetContentQuery<any>(id);
  const {
    data: userData,
    isLoading: isUserLoading,
    isError,
  } = useGetUserQuery(userId);
  const [view] = useCreateViewMutation();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const [url, setUrl] = React.useState('');

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

  useEffect(() => {
    async function display(videoStream: string) {
      let blob = await fetch(videoStream).then((r) => r.blob());
      var videoUrl = createObjectURL(blob);
      setUrl(videoUrl);
    }
    if (data?.data?.preference?.video?.video) {
      display(decrypt(data?.data?.preference?.video?.video));
    }
  }, [data?.data?.preference?.video?.video]);

  return (
    <>
      {isLoading ||
        isUserLoading ||
        !data?.data ||
        (!url && (
          <Box h='90vh' w='100%'>
            <CliqueLoader />
          </Box>
        ))}
      {userData && !isLoading && !isUserLoading && data?.data && url && (
        <HomeLayout>
          <Box display={{lg: 'flex'}}>
            <Box
              maxH={'90vh'}
              pb={{base: '30px', lg: '50px'}}
              px={{base: '10px', lg: '30px'}}
              maxW={{base: '100%', lg: 'calc(100vw - 400px)'}}
              w={{base: '100%', lg: 'calc(100vw - 400px)'}}
              overflowY={'scroll'}
              overflowX={'hidden'}
              // sx={{
              //   '&::-webkit-scrollbar': {
              //     width: '8px',
              //     rounded: 'full',
              //   },
              //   '&::-webkit-scrollbar-track': {
              //     boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              //     webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              //   },
              //   '&::-webkit-scrollbar-thumb': {
              //     bg: 'clique.primaryBg',
              //     outline: 'none',
              //   },
              // }}

              sx={scrollBarStyle3}
            >
              <VideoPlayer
                video={data?.data?.preference?.video}
                videoIdsList={data?.data?.preference?.allVideos}
                url={url}
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
