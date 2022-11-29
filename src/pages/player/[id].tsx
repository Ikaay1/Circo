import HomeLayout from 'layouts/HomeLayout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppSelector } from 'redux/app/hooks';
import {
	useCreateViewMutation,
	useDislikeContentCommentMutation,
	useDislikeContentMutation,
	useGetContentQuery,
	useLikeContentCommentMutation,
	useLikeContentMutation,
} from 'redux/services/content.service';

import { Box, Flex } from '@chakra-ui/react';
import CommentSection from '@components/player/CommentSection';
import VideoDetails from '@components/player/VideoDetails';
import VideoPlayer from '@components/player/VideoPlayer';

function Index() {
  const router = useRouter();
  const {id} = router.query;
  const {data, isLoading, refetch} = useGetContentQuery(id);
  const [view] = useCreateViewMutation();
  const [like] = useLikeContentMutation();
  const [dislike] = useDislikeContentMutation();
  const [likeComment] = useLikeContentCommentMutation();
  const [dislikeComment] = useDislikeContentCommentMutation();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);

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

  const handleLike = async () => {
    await like({video_id: data.data.preference.video._id});
    refetch();
  };

  const handleDislike = async () => {
    await dislike({video_id: data.data.preference.video._id});
    refetch();
  };

  const handleLikeComment = async (id: string) => {
    await likeComment({commentId: id});
    refetch();
  };

  const handleDislikeComment = async (id: string) => {
    await dislikeComment({commentId: id});
    refetch();
  };

  return (
    <>
      {isLoading || !data ? (
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
              <VideoPlayer
                video={data.data.preference.video}
                handleLike={handleLike}
                handleDislike={handleDislike}
              />
              <VideoDetails
                video={data.data.preference.video}
                subscribers={data.data.preference.video.uploader_id.subscribers}
              />
            </Box>
            {/* @ts-ignore */}
            <CommentSection
              id={id}
              handleLikeComment={handleLikeComment}
              handleDislikeComment={handleDislikeComment}
            />
          </Flex>
        </HomeLayout>
      )}
    </>
  );
}

export default Index;
