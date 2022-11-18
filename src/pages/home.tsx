import HomeLayout from 'layouts/HomeLayout';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'redux/app/hooks';
import { useCategoryQuery } from 'redux/services/category.service';
import { useGetContentsQuery } from 'redux/services/content.service';

import { Box, Divider, Flex } from '@chakra-ui/react';
import EmptyState from '@components/emptyState/EmptyState';
import CliqueLoader from '@components/home/CliqueLoader';
import LiveEvents from '@components/home/LiveEvents';
import LiveTopCard from '@components/home/LiveTopCard';
import TagSection from '@components/home/TagSection';
import VideoGrid from '@components/home/VideoGrid';
import VideoSkeletonLoader from '@components/home/VideoSkeletonLoader';
import SideMenu from '@components/widgets/sideMenu';
import { contentData, scrollBarStyle } from '@constants/utils';

import useGetContents from '../hooks/useGetContents';

function Index() {
  const [page, setPage] = useState(1);

  const [hasChannel, setHasChannel] = useState(true);
  const [numberOfTickets, setNumberOfTickets] = React.useState(2);
  const [categoryId, setCategoryId] = useState('all');
  const categories = useCategoryQuery('');
  const router = useRouter();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const {data, isFetching, isLoading} = useGetContentsQuery({
    page,
    limit: 7,
    categoryId,
  });

  useEffect(() => {
    if (!userProfile?._id) {
      router.push('/login');
    }
  }, [userProfile?._id, router]);

  const {loading, hasMore, contents} = useGetContents({
    data,
    isFetching,
    page,
    isLoading,
    categoryId,
  });

  const observerRef: any = useRef();
  const lastElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <>
      <HomeLayout>
        <Flex>
          <SideMenu />
          <Box
            maxH={'90vh'}
            pb='50px'
            px='30px'
            w={'calc(100vw - 500px)'}
            overflowY={'scroll'}
            overflowX={'hidden'}
            sx={scrollBarStyle}
          >
            {!categories.data ? (
              <CliqueLoader />
            ) : (
              <>
                <LiveTopCard />
                <Divider />
                <TagSection
                  categories={categories.data.data}
                  setCategoryId={setCategoryId}
                  categoryId={categoryId}
                  setPage={setPage}
                />
                <Divider />

                {
                  <>
                    {isFetching && page === 1 ? (
                      <VideoSkeletonLoader />
                    ) : !isFetching && !contents.length ? (
                      <Box mt='20px' height='65%'>
                        <EmptyState msg='Oops!. No video here' />
                      </Box>
                    ) : (
                      <>
                        <VideoGrid
                          thumbWidth={{lg: '220px', mlg: '280px', xl: 'full'}}
                          width={'calc(100vw - 560px)'}
                          videos={contents}
                          lastElementRef={lastElementRef}
                        />
                        {loading && <VideoSkeletonLoader />}
                      </>
                    )}
                  </>
                }
              </>
            )}
          </Box>
          <LiveEvents />
        </Flex>
      </HomeLayout>
    </>
  );
}

export default Index;
