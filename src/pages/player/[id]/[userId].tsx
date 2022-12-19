import HomeLayout from 'layouts/HomeLayout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppSelector } from 'redux/app/hooks';
import {
	useCreateViewMutation,
	useExpiredSubscriptionMutation,
	useGetContentQuery,
} from 'redux/services/content.service';
import { useGetUserQuery } from 'redux/services/user.service';

import { Box, Flex, useToast } from '@chakra-ui/react';
import CommentSection from '@components/player/CommentSection';
import VideoDetails from '@components/player/VideoDetails';
import VideoPlayer from '@components/player/VideoPlayer';

function Index() {
  const toast = useToast();
  const router = useRouter();
  const {id, userId} = router.query;
  const {data, isLoading, refetch} = useGetContentQuery(id);
  const {data: userData, isFetching} = useGetUserQuery(userId);
  const [view] = useCreateViewMutation();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const [expiredSub] = useExpiredSubscriptionMutation();

  useEffect(() => {
    if (!userProfile?._id) {
      window.location.replace('/login');
    }
  }, [userProfile?._id, router]);

  useEffect(() => {
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
  }, [toast, userData, userProfile._id]);

  useEffect(() => {
    const expired = async () => {
      const res: any = await expiredSub({
        id: data.data.preference.video.uploader_id._id,
      });
      console.log('res', res);
      if (res?.data?.data?.email) {
        toast({
          title: 'Your subscription to this content uploader has expired',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setTimeout(() => {
          window.location.replace('/home');
        }, 500);
      }
    };
    if (data) {
      expired();
    }
  }, [expiredSub, data, router, toast]);

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
      {isLoading || !data || !userData ? (
        <Box></Box>
      ) : (
        <HomeLayout>
          <Flex>
            <Box
              maxH={'90vh'}
              pb='50px'
              px='30px'
              maxW={'calc(100vw - 400px)'}
              w={'calc(100vw - 400px)'}
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
              <VideoPlayer video={data.data.preference.video} />
              <VideoDetails
                video={data.data.preference.video}
                subscribers={data.data.preference.video.uploader_id.subscribers}
              />
            </Box>
            {/* @ts-ignore */}
            <CommentSection id={id} />
          </Flex>
        </HomeLayout>
      )}
    </>
  );
}

export default Index;
