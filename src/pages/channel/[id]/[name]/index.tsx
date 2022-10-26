import { Box, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import Index from '@components/profile';
import SideMenu from '@components/profile/SideMenu';
import Header from '@components/widgets/Header';
import { channelMenu } from '@constants/utils';

const Profile = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
      <Box bg={useColorModeValue("clique.primaryBg", "clique.primaryBg")}>
        <Header upload={onOpen} />
        <Box h={{ lg: "90vh" }} display="flex">
          <Box flex="1" h="100%">
            <SideMenu menu={channelMenu} />
          </Box>
          <Box flex="5.5" h="100%">
            <Index />
          </Box>
        </Box>
      </Box>
    );
};

export default Profile;
