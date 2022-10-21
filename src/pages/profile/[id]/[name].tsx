import React from 'react';

import { Box, useDisclosure } from '@chakra-ui/react';
import Index from '@components/profile';
import SideMenu from '@components/profile/SideMenu';
import Header from '@components/widgets/Header';

const Profile = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Box>
            <Header upload={onOpen} />
            <Box h={{lg: '90vh'}} display='flex'>
                <Box flex='1' h='100%'>
                    <SideMenu />
                </Box>
                <Box flex='5.5' h='100%'>
                    <Index />
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;
