import HomeLayout from 'layouts/HomeLayout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useGetContentQuery } from 'redux/services/content.service';

import { Box, Flex } from '@chakra-ui/react';
import CommentSection from '@components/player/CommentSection';
import VideoDetails from '@components/player/VideoDetails';
import VideoPlayer from '@components/player/VideoPlayer';

function Index() {
  const router = useRouter();
  const {id} = router.query;

  const [subscribers, setSubscribers] = useState<string[]>([]);
  const {data, isLoading} = useGetContentQuery(id);

  useEffect(() => {
    if (data) {
      setSubscribers(data.data.preference.video.uploader_id.subscribers);
    }
  }, [data]);

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
              <VideoPlayer video={data.data.preference.video} />
              <VideoDetails
                video={data.data.preference.video}
                setSubscribers={setSubscribers}
                subscribers={subscribers}
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
