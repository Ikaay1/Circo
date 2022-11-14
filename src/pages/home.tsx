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

import { Box, Divider, Flex } from '@chakra-ui/react';
import CliqueLoader from '@components/home/CliqueLoader';
import LiveEvents from '@components/home/LiveEvents';
import LiveTopCard from '@components/home/LiveTopCard';
import TagSection from '@components/home/TagSection';
import VideoGrid from '@components/home/VideoGrid';
import SideMenu from '@components/widgets/sideMenu';
import { scrollBarStyle } from '@constants/utils';

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
  const {data: dataBySearch, refetch} = useGetContentsBySearchQuery({
    page: 1,
    limit: 50,
    search: search,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userProfile?._id) {
      router.push('/login');
    }
  }, [userProfile?._id, router]);

  useEffect(() => {
    if (!search) {
      if (data) {
        setLoading(false);
      }
      if (!categoryId) {
        setContents(data?.data?.preference?.videos);
      } else {
        setContents(
          data?.data?.preference?.videos.filter(
            (video: contentData) => video.category_id === categoryId,
          ),
        );
      }
    } else {
      if (dataBySearch) {
        setLoading(false);
      }
      if (!categoryId) {
        setContents(dataBySearch?.data?.preference?.videos);
      } else {
        setContents(
          dataBySearch?.data?.preference?.videos.filter(
            (video: contentData) => video.category_id === categoryId,
          ),
        );
      }
    }
  }, [
    data?.data?.preference?.videos,
    search,
    dataBySearch?.data?.preference?.videos,
    categoryId,
    data,
    dataBySearch,
  ]);
  const {
    data: channelData,
    isError,
    isLoading: channelLoading,
  } = useGetChannelQuery('channel');

  useEffect(() => {
    if (!channelLoading && channelData?.channelData?.channel === null) {
      setHasChannel(false);
    }
  }, [channelLoading, channelData, hasChannel]);

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
            {!categories.data || loading ? (
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

                <VideoGrid
                  thumbWidth={{lg: '220px', mlg: '280px', xl: 'full'}}
                  width={'calc(100vw - 560px)'}
                  videos={contents}
                />
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
