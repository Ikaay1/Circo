import { useRouter } from 'next/router';
import React from 'react';

import { Box, Image, Text } from '@chakra-ui/react';
import { scrollBarStyle } from '@constants/utils';

import Contents from './Contents';
import EditProfile from './EditProfile';
import Subscriptions from './Subscriptions';

const Index = () => {
    const router = useRouter();
    return (
        <Box
            height={'100%'}
            overflowY='scroll'
            position={'relative'}
            pb='3rem'
            sx={scrollBarStyle}
        >
            <Box position='relative'>
                <Image
                    w='100%'
                    h='170px'
                    src='/assets/coverphoto.png'
                    alt='cover photo'
                />
                <Box
                    position={'absolute'}
                    bottom={router.query.name === 'content' ? '-100%' : '-52%'}
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
                    {router.query.name === 'content' && (
                        <>
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
                        </>
                    )}
                </Box>
            </Box>

            {router.query.name === 'content' && (
                <Box mt={'15rem'} px='1.35rem'>
                    <Contents />
                </Box>
            )}

            {/* <Box position={'absolute'} top='0' right='0'>
                <NewPlaylist />
            </Box> */}
            <Box position={'absolute'} top='0' right='0'>
                <Subscriptions />
            </Box>

            {router.query.name === 'edit' && (
                <Box mt={'8.5rem'} px='1.35rem'>
                    <EditProfile />
                </Box>
            )}
        </Box>
    );
};

export default Index;
