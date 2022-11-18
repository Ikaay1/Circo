import HomeLayout from 'layouts/HomeLayout';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCategoryQuery } from 'redux/services/category.service';
import { useGetContentsBySearchQuery } from 'redux/services/content.service';

import {
	Box,
	Divider,
	Flex,
	SimpleGrid,
	Skeleton,
	SkeletonCircle,
} from '@chakra-ui/react';
import EmptyState from '@components/emptyState/EmptyState';
import CliqueLoader from '@components/home/CliqueLoader';
import LiveEvents from '@components/home/LiveEvents';
import LiveTopCard from '@components/home/LiveTopCard';
import TagSection from '@components/home/TagSection';
import VideoGrid from '@components/home/VideoGrid';
import SideMenu from '@components/widgets/sideMenu';
import { contentData, scrollBarStyle } from '@constants/utils';

function Search() {
  const [categoryId, setCategoryId] = useState('all');
  const categories = useCategoryQuery('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [contents, setContents] = useState<contentData[]>([]);
  const [page, setPage] = useState(1);
  const {search} = router.query;
  const {data, isFetching, isLoading} = useGetContentsBySearchQuery({
    page,
    limit: 7,
    search,
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
          console.log('last');
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore],
  );

  useEffect(() => {
    setHasMore(false);
    setContents([]);
  }, [categoryId]);

  useEffect(() => {
    if (data && !isFetching) {
      setContents((prevContents) => [
        ...prevContents,
        ...data?.data?.preference?.videos,
      ]);
      if (data?.data?.preference?.videos.length === 7) {
        setHasMore(page < data?.data?.preference.totalPages);
      } else {
        setHasMore(false);
      }
    }
  }, [data, page, isFetching]);

  useEffect(() => {
    if (!hasMore) return;
    if (data && !isLoading && isFetching && page !== 1) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data, isFetching, isLoading, page, hasMore]);

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
                      <SimpleGrid
                        mt='20px'
                        w='100%'
                        bg='clique.blackGrey'
                        p='10px'
                        columns={{lg: 3, xl: 4}}
                        spacing={'30px'}
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <Box
                            key={num}
                            h={'100%'}
                            w={{lg: '230px', xl: '310px'}}
                          >
                            <Skeleton h='150px' borderRadius='10px' />
                            <Flex mt={'.5rem'} alignItems='center' w='100%'>
                              <SkeletonCircle size='10' mr='.5rem' />
                              <Box w='100%'>
                                <Skeleton w='100%' height='10px' />
                                <Skeleton w='100%' my={'3px'} height='10px' />
                                <Skeleton w='100%' height='10px' />
                              </Box>
                            </Flex>
                          </Box>
                        ))}
                      </SimpleGrid>
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
                        {loading && (
                          <SimpleGrid
                            mt='20px'
                            w='100%'
                            bg='clique.blackGrey'
                            p='10px'
                            columns={{lg: 3, xl: 4}}
                            spacing={'30px'}
                          >
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <Box
                                key={num}
                                h={'100%'}
                                w={{lg: '230px', xl: '310px'}}
                              >
                                <Skeleton h='150px' borderRadius='10px' />
                                <Flex mt={'.5rem'} alignItems='center' w='100%'>
                                  <SkeletonCircle size='10' mr='.5rem' />
                                  <Box w='100%'>
                                    <Skeleton w='100%' height='10px' />
                                    <Skeleton
                                      w='100%'
                                      my={'3px'}
                                      height='10px'
                                    />
                                    <Skeleton w='100%' height='10px' />
                                  </Box>
                                </Flex>
                              </Box>
                            ))}
                          </SimpleGrid>
                        )}
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

export default Search;
