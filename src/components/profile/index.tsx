import { useRouter } from 'next/router';
import React from 'react';

import {
	Box,
	Image,
	Modal,
	ModalContent,
	ModalOverlay,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import ChannelContents from '@components/channel/ChannelContents';
import EditChannel from '@components/channel/EditChannel';
import Contents from '@components/profile/Contents';
import { scrollBarStyle } from '@constants/utils';

import EditProfile from './EditProfile';
import Subscriptions from './Subscriptions';

const Index = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const router = useRouter();
    console.log(router);
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
                                fontSize='head'
                                lineHeight='32px'
                                color='clique.white'
                                textAlign={'center'}
                            >
                                Ayra Star
                            </Text>
                            <Text
                                fontSize='subHead'
                                lineHeight='24px'
                                color='clique.secondaryGrey2'
                                textAlign={'center'}
                            >
                                @ayrastar
                            </Text>
                            <Text
                                fontWeight='500'
                                fontSize='subHead'
                                lineHeight='24px'
                                textDecorationLine='underline'
                                color='clique.secondaryGrey2'
                                textAlign={'center'}
                                onClick={() => {
                                    onOpen();
                                }}
                                cursor='pointer'
                            >
                                SUBSCRIPTIONS
                            </Text>
                        </>
                    )}
                </Box>
            </Box>

            {router.asPath.split('/')[1] === 'channel' &&
                router.query.name !== 'edit' && (
                    <Box w='40%' mt={'1.4rem'} ml='1rem'>
                        <Text
                            fontWeight='600'
                            fontSize='subHead'
                            lineHeight='24px'
                            color='clique.secondaryGrey2'
                        >
                            Bio
                        </Text>
                        <Text
                            fontWeight='400'
                            fontSize='smSubHead'
                            lineHeight='24px'
                            color='clique.secondaryGrey2'
                            pr='1rem'
                        >
                            I am Ayra Star, a music artist with the best selling
                            album on Apple Music, and Spotify, titled “19 and
                            Undagelous”. I have toured 47 countries doing music
                            tours in cities likes LA, NYC, Texas, Toronto and
                            many more.
                        </Text>
                    </Box>
                )}

            {router.query.name === 'content' &&
                router.asPath.split('/')[1] === 'profile' && (
                    <Box mt={'15rem'} px='1.35rem'>
                        <Contents />
                    </Box>
                )}

            {router.query.name === 'content' &&
                router.asPath.split('/')[1] === 'channel' && (
                    <Box mt={'6rem'} px='1.35rem'>
                        <ChannelContents />
                    </Box>
                )}

            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInRight'
                scrollBehavior='inside'
            >
                <ModalOverlay />
                <ModalContent
                    maxW='400px'
                    w='400px'
                    bottom='0'
                    minH='100vh'
                    overflowY={'scroll'}
                    sx={scrollBarStyle}
                    m='0'
                    py='30px'
                    position={'absolute'}
                    right={0}
                    bg='clique.black'
                >
                    <Subscriptions />
                </ModalContent>
            </Modal>
            {/* <Box position={'absolute'} top='0' right='0'>
                <Subscriptions />
            </Box> */}

            {router.query.name === 'edit' &&
                router.asPath.split('/')[1] === 'profile' && (
                    <Box mt={'8.5rem'} px='1.35rem'>
                        <EditProfile />
                    </Box>
                )}

            {router.query.name === 'edit' &&
                router.asPath.split('/')[1] === 'channel' && (
                    <Box mt={'1.4rem'} px='1.35rem'>
                        <EditChannel />
                    </Box>
                )}
        </Box>
    );
};

export default Index;
