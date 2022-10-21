import React from 'react';

import { Box, Image, Text } from '@chakra-ui/react';

import PlaylistList from './PlaylistList';

const PlaylistDetails = () => {
    return (
        <Box display={'flex'} px='1.4rem' py='2rem' gap='25px'>
            <Box flex='1.6'>
                <Box>
                    <Image
                        src='/assets/pinkstar.png'
                        w='100%'
                        objectFit={'cover'}
                        h='150px'
                        borderRadius='10px'
                        alt=''
                    />
                    <Text
                        fontFamily={'Poppins'}
                        fontSize='sm2'
                        lineHeight='28px'
                        color='clique.white'
                        textAlign={'center'}
                        mt='1.1rem'
                    >
                        LA Tour Playlist
                    </Text>
                    <Text
                        fontFamily={'Poppins'}
                        fontSize='smSubHead'
                        lineHeight='24px'
                        color='clique.secondaryGrey2'
                        textAlign={'center'}
                    >
                        43 Videos
                    </Text>
                </Box>
            </Box>
            <Box flex='5'>
                <PlaylistList />
            </Box>
        </Box>
    );
};

export default PlaylistDetails;
