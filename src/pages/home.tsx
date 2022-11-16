import HomeLayout from 'layouts/HomeLayout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/app/hooks';
import { useCategoryQuery } from 'redux/services/category.service';
import { useGetChannelQuery } from 'redux/services/channel.service';
import {
	useGetContentsBySearchQuery,
	useGetContentsQuery,
} from 'redux/services/content.service';

import {
	Box,
	Divider,
	Flex,
	SimpleGrid,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
} from '@chakra-ui/react';
import EmptyState from '@components/emptyState/EmptyState';
import CliqueLoader from '@components/home/CliqueLoader';
import LiveEvents from '@components/home/LiveEvents';
import LiveTopCard from '@components/home/LiveTopCard';
import TagSection from '@components/home/TagSection';
import VideoGrid from '@components/home/VideoGrid';
import SideMenu from '@components/widgets/sideMenu';
import { API, baseUrl, scrollBarStyle } from '@constants/utils';

import { contentData } from '../constants/utils';

function Index() {
  const [hasChannel, setHasChannel] = useState(true);
  const [numberOfTickets, setNumberOfTickets] = React.useState(2);
  // const {data} = useGetContentsQuery({page: 1, limit: 50});
  const [categoryId, setCategoryId] = useState('');
  const categories = useCategoryQuery('');
  const [contents, setContents] = useState<contentData[]>([]);
  const [response, setResponse] = useState<any>({});
  const router = useRouter();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userProfile?._id) {
      router.push('/login');
    }
  }, [userProfile?._id, router]);

  // useEffect(() => {
  //   if (data) {
  //     if (!categoryId) {
  //       setContents(data?.data?.preference?.videos);
  //     } else {
  //       setContents(
  //         data?.data?.preference?.videos.filter(
  //           (video: contentData) => video.category_id === categoryId,
  //         ),
  //       );
  //     }
  //   }
  // }, [data, categoryId]);

  useEffect(() => {
    if (!categoryId) {
      setLoading(true);
      API.get(`${baseUrl}content/upload-video?page=${1}&limit=${50}`).then(
        (res) => {
          setResponse(res?.data);
          setContents(res?.data?.data?.preference?.videos);
          setLoading(false);
        },
      );
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      API.get(
        `${baseUrl}content/upload-video/category/${categoryId}?page=${1}&limit=${50}`,
      ).then((res) => {
        setResponse(res?.data);
        setContents(res?.data?.data?.preference?.videos);
        setLoading(false);
      });
    }
  }, [categoryId]);

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
                    columns={{lg: 3, xl: 4}}
                    spacing={'30px'}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <Box key={num} h={'100%'} w={{lg: '230px', xl: '310px'}}>
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

export default Index;
