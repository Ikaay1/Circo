import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from 'redux/app/hooks';
import { useGetSinglePlaylistQuery } from 'redux/services/playlist.service';

import { Box, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import PlaylistDetails from '@components/profile/PlaylistDetails';
import PlaylistSide from '@components/profile/PlaylistSide';
import Header from '@components/widgets/Header';
import { scrollBarStyle3 } from '@constants/utils';

const Playlist = () => {
  const router = useRouter();
  const id = router?.query?.playlistId;
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {data, isLoading} = useGetSinglePlaylistQuery(id);
  const {userProfile} = useAppSelector((store) => store.app.userReducer);

  return (
    <Box bg={useColorModeValue('clique.primaryBg', 'clique.primaryBg')}>
      <Header upload={onOpen} />
      <Box h={{lg: '90vh'}} display='flex'>
        <Box
          flex='1.3'
          h='100%'
          px='5'
          borderRight={'1px solid rgba(255, 255, 255, 0.1)'}
        >
          <PlaylistSide
            isLoading={isLoading}
            playlist={data?.data?.playlist}
            id={data?.data?.playlist?.userId._id}
          />
        </Box>
        <Box flex='5.5' h='100%' overflowY='scroll' sx={scrollBarStyle3}>
          <PlaylistDetails
            playlist={data?.data?.playlist}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Playlist;
