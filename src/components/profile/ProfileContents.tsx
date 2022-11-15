import { useState } from 'react';
import { useAppSelector } from 'redux/app/hooks';

// import { useGetUserContentsQuery } from 'redux/services/content.service';
import { Box, SimpleGrid, TabPanels, Tabs, Text } from '@chakra-ui/react';
import VideoGrid from '@components/home/VideoGrid';
import EventModal from '@components/liveevents/eventCard/EventModal';
import CliqueTabPanel from '@components/widgets/CliqueTabPanel';
import { profileNav } from '@constants/utils';

import Playlists from './Playlists';

const ProfileContents = () => {
  const [route, setRoute] = useState('paid');
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
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
                  <EventModal />
                  <EventModal />
                  <EventModal />
                  <EventModal />
                </SimpleGrid>
              </CliqueTabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}

      {route === 'play' && (
        <Box mt={'2.5rem'}>
          <Playlists newPlaylist={true} />
        </Box>
      )}

      {route === 'saved' && (
        <Box mt={'2.3rem'}>
          <VideoGrid width={'100%'} videos={userProfile.savedVideos} />
        </Box>
      )}
    </>
  );
};

export default ProfileContents;
