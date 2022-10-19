import React from 'react';

import { Box, Icon, Image, Text } from '@chakra-ui/react';

import UploadPlaylistIcon from '../../assets/icons/UploadPlaylistIcon';
import Contents from './Contents';

const Index = () => {
    return (
        <Box height={'100%'} overflowY='scroll' position={'relative'}>
            <Box position='relative'>
                <Image
                    w='100%'
                    h='170px'
                    src='/assets/coverphoto.png'
                    alt='cover photo'
                />
                <Box
                    position={'absolute'}
                    bottom='-100%'
                    left={'50%'}
                    transform='translateX(-50%)'
                >
                    <Image
                        src='/assets/profilephoto.png'
                        alt='profile photo'
                        borderRadius='50%'
                        objectFit={'cover'}
                        h='120px'
                        w='120px'
                    />
                    <Text
                        fontWeight='600'
                        fontSize='24px'
                        lineHeight='32px'
                        color='clique.white'
                        textAlign={'center'}
                    >
                        Ayra Star
                    </Text>
                    <Text
                        fontSize='16px'
                        lineHeight='24px'
                        color='clique.secondaryGrey2'
                        textAlign={'center'}
                    >
                        @ayrastar
                    </Text>
                    <Text
                        fontWeight='500'
                        fontSize='16px'
                        lineHeight='24px'
                        textDecorationLine='underline'
                        color='clique.secondaryGrey2'
                        textAlign={'center'}
                    >
                        SUBSCRIPTIONS
                    </Text>
                </Box>
            </Box>
            <Box mt={'15rem'} px='1.35rem'>
                <Contents />
            </Box>

            <Box
                position={'absolute'}
                top='0'
                right='0'
                bg='clique.black'
                w='420px'
                p='1rem'
            >
                <Box>
                    <Text
                        fontWeight='500'
                        fontSize='28px'
                        lineHeight='36px'
                        letterSpacing='-0.02em'
                        color='clique.white'
                        textAlign={'center'}
                        mb='1rem'
                    >
                        New Playlist
                    </Text>
                    <label>
                        <Box
                            width='100%'
                            height='341px'
                            background='clique.blackGrey'
                            borderRadius='10px'
                            position='relative'
                            cursor={'pointer'}
                        >
                            <input
                                style={{
                                    opacity: 0,
                                }}
                                type='file'
                                name=''
                                id=''
                            />
                            <Box
                                position={'absolute'}
                                top='50%'
                                left={'50%'}
                                transform='translate(-50%, -50%)'
                            >
                                <Icon as={UploadPlaylistIcon} />
                            </Box>
                        </Box>
                    </label>
                </Box>
            </Box>
        </Box>
    );
};

export default Index;
