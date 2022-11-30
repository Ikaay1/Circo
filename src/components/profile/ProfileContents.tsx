import { useState } from 'react';
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
  const {
    data: userData,
    isFetching: userIsFetching,
  } = useGetUserQuery(userProfile._id);

  console.log(userData);

  const {data, isFetching} = useGetUserPaidStreamQuery('');

  return (
    <>
      <Box borderBottom={'1px solid rgba(255, 255, 255, 0.1)'} display='flex'>
        {profileNav.map(({title, name}) => (
          <Text
            mr={'3rem'}
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
                <SimpleGrid
                  columns={{base: 3, lg: 4, mlg: 4, xl: 5}}
                  spacing='30px'
                >
                  {isFetching &&
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                      <CardLoader key={i} />
                    ))}
                  {!isFetching &&
                    data &&
                    data.data.map((event: any) => (
                      <EventModal key={event.id} event={event} />
                    ))}
                </SimpleGrid>
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
          <Box mt='2.3rem'>
            <EmptyState msg='Oops! No saved videos yet. save a video!' />
          </Box>
        ) : (
          <Box mt={'2.3rem'}>
            <VideoGrid
              width={'100%'}
              videos={userData?.data?.savedVideos}
            />
          </Box>
        ))}
    </>
  );
};

export default ProfileContents;
