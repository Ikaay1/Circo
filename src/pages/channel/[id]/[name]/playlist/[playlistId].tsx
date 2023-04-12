import HomeLayout from 'layouts/HomeLayout';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useAppSelector} from 'redux/app/hooks';
import {useGetSinglePlaylistQuery} from 'redux/services/playlist.service';

import {Box, useColorModeValue, useDisclosure} from '@chakra-ui/react';
import PlaylistDetails from '@components/profile/PlaylistDetails';
import PlaylistSide from '@components/profile/PlaylistSide';
import Header from '@components/widgets/Header';
import Color from '@constants/color';
import {scrollBarStyle3} from '@constants/utils';

const Playlist = () => {
  const router = useRouter();
  const id = router?.query?.playlistId;
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {data, isLoading} = useGetSinglePlaylistQuery(id);
  const {userProfile} = useAppSelector((store) => store.app.userReducer);

  return (
    <HomeLayout>
      <Box h='90vh' display='flex' flexDirection={{base: 'column', lg: 'row'}}>
        <Box
          flex={{lg: '1.3'}}
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
        <Box
          flex={{lg: '5.5'}}
          h='100%'
          overflowY='scroll'
          sx={scrollBarStyle3}
        >
          <PlaylistDetails
            playlist={data?.data?.playlist}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </HomeLayout>
  );
};

export default Playlist;

export {getServerSideProps} from '../../../../../components/widgets/Chakara';
