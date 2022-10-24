import React from 'react';

import { Box, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import PlaylistDetails from '@components/profile/PlaylistDetails';
import SideMenu from '@components/profile/SideMenu';
import Header from '@components/widgets/Header';
import { profileMenu, scrollBarStyle } from '@constants/utils';

const Playlist = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Box bg={useColorModeValue('clique.white', 'clique.primaryBg')}>
            <Header upload={onOpen} />
            <Box h={{lg: '90vh'}} display='flex'>
                <Box flex='1' h='100%'>
                    <SideMenu menu={profileMenu} />
                </Box>
                <Box flex='5.5' h='100%' overflowY='scroll' sx={scrollBarStyle}>
                    <PlaylistDetails />
                </Box>
            </Box>
        </Box>
    );
};

export default Playlist;
