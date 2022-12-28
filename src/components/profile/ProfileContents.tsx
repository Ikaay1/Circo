import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/app/hooks';
import { useGetUserPaidStreamQuery } from 'redux/services/livestream/live.service';
// import EventModal from "@components/liveevents/eventCard/EventModal";
import { useGetUserQuery } from 'redux/services/user.service';

// import { useGetUserContentsQuery } from 'redux/services/content.service';
import { Box, SimpleGrid, TabPanels, Tabs, Text } from '@chakra-ui/react';
import EmptyState from '@components/emptyState/EmptyState';
import VideoGrid from '@components/home/VideoGrid';
import VideoSkeletonLoader from '@components/home/VideoSkeletonLoader';
import CardLoader from '@components/liveevents/CardLoad';
import EventModal from '@components/liveevents/eventCard/EventModal';
import CliqueTabPanel from '@components/widgets/CliqueTabPanel';
import { profileNav } from '@constants/utils';

import Playlists from './Playlists';

const ProfileContents = () => {
  const [route, setRoute] = useState('paid');
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const {data: userData, isFetching: userIsFetching} = useGetUserQuery(
    userProfile?._id,
  );

  console.log(userData);
  const router = useRouter();

  const {data, isFetching} = useGetUserPaidStreamQuery('');

  useEffect(() => {
    if (!userProfile?._id) {
      window.location.replace('/login');
    }
  }, [userProfile?._id, router]);

  return (
    <>
      <Box
        borderBottom={'1px solid rgba(255, 255, 255, 0.1)'}
        display='flex'
        justifyContent={{base: 'space-between', lg: 'flex-start'}}
      >
        {profileNav.map(({title, name}) => (
          <Text
            mr={{lg: '3rem'}}
            lineHeight='24px'
            color='clique.white'
            pb={'.8rem'}
            borderBottom={route === name ? '4px solid #892CDC' : 'none'}
            cursor={'pointer'}
            key={'name'}
            onClick={() => setRoute(name)}
          >
            {title}
          </Text>
        ))}
      </Box>

      {route === 'paid' && (
        <Box mt={'1.5rem'}>
          <Tabs
            variant={'unstyled'}
            minW='full'
            fontFamily='Poppins'
            color={'clique.white'}
          >
            <TabPanels>
              <CliqueTabPanel>
                {isFetching ? (
                  <SimpleGrid
                    columns={{base: 1, lg: 4, mlg: 4, xl: 5}}
                    spacing='30px'
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <CardLoader key={i} />
                    ))}
                  </SimpleGrid>
                ) : data && data?.data?.length ? (
                  <SimpleGrid
                    columns={{base: 1, lg: 4, mlg: 4, xl: 5}}
                    spacing='30px'
                  >
                    {data.data.map((event: any) => (
                      <EventModal key={event.id} event={event} />
                    ))}
                  </SimpleGrid>
                ) : (
                  <Box w={{base: '100%'}} h={{base: '30vh', lg: '100%'}}>
                    <EmptyState msg='You have no paid live event' />
                  </Box>
                )}
              </CliqueTabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}

      {route === 'play' && (
        <Box mt={'2.5rem'}>
          <Playlists id={userData?.data?._id} />
        </Box>
      )}

      {route === 'saved' &&
        (userIsFetching ? (
          <VideoSkeletonLoader />
        ) : userData?.data?.savedVideos?.length === 0 ? (
          <Box mt='2.3rem' h={{base: '30vh', lg: '100%'}}>
            <EmptyState msg='Oops! No saved videos yet. save a video!' />
          </Box>
        ) : (
          <Box mt={'2.3rem'}>
            <VideoGrid width={'100%'} videos={userData?.data?.savedVideos} />
          </Box>
        ))}
    </>
  );
};

export default ProfileContents;
