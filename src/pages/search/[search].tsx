import HomeLayout from 'layouts/HomeLayout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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
import { API, baseUrl, scrollBarStyle } from '@constants/utils';

import { contentData } from '../../constants/utils';

function Search() {
  const [categoryId, setCategoryId] = useState('');
  const categories = useCategoryQuery('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>({});
  const [contents, setContents] = useState<contentData[]>([]);
  const [page, setPage] = useState(1);
  const {search} = router.query;

  useEffect(() => {
    if (!categoryId) {
      setLoading(true);
      API.get(
        `${baseUrl}content/search?page=${1}&limit=${50}&search=${search}`,
      ).then((res) => {
        setResponse(res?.data);
        setContents(res?.data?.data?.preference?.videos);
        setLoading(false);
      });
    }
  }, [search, categoryId]);

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      API.get(
        `${baseUrl}content/search/${categoryId}?page=${1}&limit=${50}&search=${search}`,
      ).then((res) => {
        setResponse(res?.data);
        setContents(res?.data?.data?.preference?.videos);
        setLoading(false);
      });
    }
  }, [search, categoryId]);

  // const fetchData = () => {
  //   console.log(page);
  //   if (categoryId) {
  //     setLoading(true);
  //     setPage(1);
  //     API.get(
  //       `${baseUrl}content/search/${categoryId}?page=${page}&limit=${6}&search=${search}`,
  //     ).then((res) => {
  //       setResponse(res?.data);
  //       setContents((prevContents) => [
  //         ...prevContents,
  //         ...res?.data?.data?.preference?.videos,
  //       ]);
  //       setLoading(false);
  //     });
  //   } else {
  //     setLoading(true);
  //     API.get(
  //       `${baseUrl}content/search?page=${page}&limit=${6}&search=${search}`,
  //     ).then((res) => {
  //       setResponse(res?.data);
  //       setContents((prevContents) => [
  //         ...prevContents,
  //         ...res?.data?.data?.preference?.videos,
  //       ]);
  //       setLoading(false);
  //     });
  //   }
  // };

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
                />
                <Divider />

                {loading ? (
                  <SimpleGrid
                    mt='20px'
                    w='100%'
                    bg='clique.blackGrey'
                    p='10px'
                    columns={3}
                    spacing='30px'
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <Box key={num} h={'100%'} w='230px'>
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
                ) : !loading && !contents.length ? (
                  <Box mt='20px' height='65%'>
                    <EmptyState msg='Oops!. No video here' />
                  </Box>
                ) : (
                  <VideoGrid
                    thumbWidth={{lg: '220px', mlg: '280px', xl: 'full'}}
                    width={'calc(100vw - 560px)'}
                    videos={contents}
                  />
                )}
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
