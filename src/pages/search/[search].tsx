import HomeLayout from 'layouts/HomeLayout';
import {useRouter} from 'next/router';
import React, {useEffect, useRef, useState} from 'react';
import {useCategoryQuery} from 'redux/services/category.service';
import {useGetContentsBySearchQuery} from 'redux/services/content.service';

import {Box, Divider, Flex, Text} from '@chakra-ui/react';
import EmptyState from '@components/emptyState/EmptyState';
import CliqueLoader from '@components/home/CliqueLoader';
import LiveEvents from '@components/home/LiveEvents';
import LiveTopCard from '@components/home/LiveTopCard';
import RecentSearches from '@components/home/RecentSearches';
import TagSection from '@components/home/TagSection';
import UserSearchResult from '@components/home/UserSearchResult';
import VideoGrid from '@components/home/VideoGrid';
import VideoSkeletonLoader from '@components/home/VideoSkeletonLoader';
import SideMenu from '@components/widgets/sideMenu';
import {scrollBarStyle3} from '@constants/utils';

function Search() {
  const [categoryId, setCategoryId] = useState('all');
  const categories = useCategoryQuery('');
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [contents, setContents] = useState<any[]>([]);
  const search = router.query?.search ? router.query?.search : '';
  const {data, isFetching} = useGetContentsBySearchQuery({
    page,
    limit: 9,
    search,
    categoryId,
  });

  useEffect(() => {
    setPage(1);
    setContents([]);
    setCategoryId('all');
  }, [search]);

  useEffect(() => {
    setPage(1);
    setContents([]);
  }, [categoryId]);

  useEffect(() => {
    if (data?.data?.preference?.videos?.length > 0) {
      setContents((prevContents) => [
        ...prevContents,
        ...data?.data?.preference?.videos,
      ]);
    }
  }, [data]);

  const lastElementRef = useRef();

  return (
    <>
      <HomeLayout>
        <Flex>
          <SideMenu />
          <Box
            maxH={'90vh'}
            pb={{base: '20px', lg: '50px'}}
            px={{base: '20px', lg: '30px'}}
            w={{base: '100%', lg: 'calc(100vw - 500px)'}}
            overflowY={'scroll'}
            overflowX={'hidden'}
            sx={scrollBarStyle3}
          >
            {!categories.data ? (
              <Box h='90vh'>
                <CliqueLoader />
              </Box>
            ) : (
              <>
                <LiveTopCard />
                <Divider />
                <RecentSearches />
                <UserSearchResult />
                <Divider />
                <TagSection
                  categories={categories.data.data}
                  setCategoryId={setCategoryId}
                  categoryId={categoryId}
                  setPage={setPage}
                />
                {
                  <>
                    {isFetching && page === 1 ? (
                      <VideoSkeletonLoader />
                    ) : !isFetching &&
                      !data?.data?.preference?.videos.length ? (
                      <Box
                        mt={{base: '8px', lg: '20px'}}
                        height={{base: '40vh', lg: '65%'}}
                      >
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
                        {isFetching && page !== 1 ? (
                          <VideoSkeletonLoader />
                        ) : null}
                        {page < data?.data?.preference?.totalPages ? (
                          <Text
                            onClick={() => setPage((prevPage) => prevPage + 1)}
                            textAlign={'right'}
                            color='clique.base'
                            cursor='pointer'
                          >
                            See More
                          </Text>
                        ) : null}
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
export {getServerSideProps} from '../../components/widgets/Chakara';
