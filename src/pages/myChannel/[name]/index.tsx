import useGet from 'hooks/useGet';
import HomeLayout from 'layouts/HomeLayout';
import {useState} from 'react';
import {useGetChannelQuery} from 'redux/services/channel.service';
import {useGetUserContentsQuery} from 'redux/services/content.service';

import {Box, useColorModeValue, useDisclosure} from '@chakra-ui/react';
import Index from '@components/channel';
import SideMenu from '@components/profile/SideMenu';
import Header from '@components/widgets/Header';
import Color from '@constants/color';
import {channelMenu} from '@constants/utils';

const Profile = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [page, setPage] = useState(1);
  const {data, isLoading, isFetching} = useGetUserContentsQuery({
    page,
    limit: 3,
  });
  const {contents, lastElementRef, loading, setContents} = useGet({
    data,
    isFetching,
    isLoading,
    fetchNumber: 3,
    page,
    setPage,
  });
  const {
    data: channelData,
    isError,
    isLoading: channelLoading,
  } = useGetChannelQuery('');
  return (
    <HomeLayout>
      <Box h='90vh' display={{lg: 'flex'}}>
        <Box flex='1.3' h='100%' display={{base: 'none', lg: 'block'}}>
          <SideMenu menu={channelMenu} />
        </Box>
        <Box flex={{lg: '5.5'}} h='100%'>
          <Index
            channelData={channelData}
            isLoading={isLoading}
            data={contents}
            channelLoading={channelLoading}
            lastElementRef={lastElementRef}
            setContents={setContents}
          />
        </Box>
      </Box>
    </HomeLayout>
  );
};

export default Profile;
export {getServerSideProps} from '../../../components/widgets/Chakara';
