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
  const {data} = useGetContentsQuery({page: 1, limit: 50});
  const [categoryId, setCategoryId] = useState('');
  const categories = useCategoryQuery('');
  const [contents, setContents] = useState<contentData[]>([]);
  const router = useRouter();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const [search, setSearch] = useState('');
  // const {data: dataBySearch, refetch} = useGetContentsBySearchQuery({
  //   page: 1,
  //   limit: 50,
  //   search: search,
  // });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userProfile?._id) {
      router.push('/login');
    }
  }, [userProfile?._id, router]);

  useEffect(() => {
    if (!search) {
      if (data) {
        if (!categoryId) {
          setContents(data?.data?.preference?.videos);
        } else {
          setContents(
            data?.data?.preference?.videos.filter(
              (video: contentData) => video.category_id === categoryId,
            ),
          );
        }
      }
    }
  }, [data, categoryId, search]);

  useEffect(() => {
    if (search) {
      setLoading(true);
      API.get(
        `${baseUrl}content/search?page=${1}&limit=${50}&search=${search}`,
      ).then((res) => {
        if (!categoryId) {
          setContents(res?.data?.data?.preference?.videos);
        } else {
          setContents(
            res?.data?.data?.preference?.videos.filter(
              (video: contentData) => video.category_id === categoryId,
            ),
          );
        }
        setLoading(false);
      });
    }
  }, [search, categoryId]);

  return (
    <>
      <HomeLayout search={search} setSearch={setSearch}>
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
            {!categories.data || (!data && !contents.length) ? (
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
                  <Box padding='6' boxShadow='lg' w='100%'>
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={4} spacing='4' />
                  </Box>
                ) : data && !contents.length ? (
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
