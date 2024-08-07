import HomeLayout from 'layouts/HomeLayout';
import { useRouter } from 'next/router';

import { Box, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import Index from '@components/profile';
import SideMenu from '@components/profile/SideMenu';
import Header from '@components/widgets/Header';
import Color from '@constants/color';

import { profileMenu } from '../../../constants/utils';

const Profile = () => {
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <HomeLayout>
      <Box h='90vh' display={{lg: 'flex'}}>
        <Box flex='1.3' h='100%' display={{base: 'none', lg: 'block'}}>
          <SideMenu menu={profileMenu} />
        </Box>
        <Box flex={{lg: '5.5'}} h='100%'>
          <Index />
        </Box>
      </Box>
    </HomeLayout>
  );
};

export default Profile;

export {getServerSideProps} from '../../../components/widgets/Chakara';
