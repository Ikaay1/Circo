import { useRouter } from 'next/router';
import React from 'react';

import {
	Box,
	Icon,
	Image,
	Modal,
	ModalContent,
	ModalOverlay,
	SimpleGrid,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { playListData, scrollBarStyle } from '@constants/utils';
import AddPlaylistIcon from '@icons/AddPlaylistIcon';

import VideoIcon from '../../assets/icons/VideoIcon';
import NewPlaylist from './NewPlaylist';

const Playlists = ({newPlaylist}: {newPlaylist: boolean}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const router = useRouter();
    return (
        <>
            {newPlaylist && (
                <Text
                    display='flex'
                    alignItems={'center'}
                    fontSize='head'
                    lineHeight='32px'
                    color='clique.white'
                >
                    New Playlist{' '}
                    <Box
                        onClick={() => {
                            onOpen();
                        }}
                    >
                        <Icon as={AddPlaylistIcon} />
                    </Box>
                </Text>
            )}

            <SimpleGrid
                autoColumns={'300px'}
                mt='20px'
                columns={4}
                w={'100%'}
                spacing={'30px'}
            >
                {playListData.map(
                    ({bigImage, smallImage, name, noOfVideos}) => (
                        <Box key={bigImage}>
                            <Box
                                w={{lg: '235px', mlg: '280px'}}
                                h={{lg: '130px', mlg: '180px'}}
                                maxW='280px'
                                maxH='200px'
                                position={'relative'}
                                cursor={'pointer'}
                                onClick={
                                    router.asPath.split('/')[1] === 'profile'
                                        ? () =>
                                              router.push(
                                                  '/profile/1/content/playlist',
                                              )
                                        : () =>
                                              router.push(
                                                  '/channel/1/content/playlist',
                                              )
                                }
                            >
                                <Image
                                    w='100%'
                                    h='100%'
                                    src={`/assets/${bigImage}.png`}
                                    alt=''
                                    objectFit={'cover'}
                                    borderRadius='10px'
                                />
                                <Box
                                    position={'absolute'}
                                    h='100%'
                                    w='83px'
                                    top='0'
                                    right='0'
                                    background='rgba(0, 0, 0, 0.6)'
                                    backdropFilter='blur(5px)'
                                    borderRadius='0px 10px 10px 0px'
                                    display={'flex'}
                                    flexDirection='column'
                                    justifyContent={'center'}
                                >
                                    <Icon as={VideoIcon} />
                                    <Text
                                        textAlign={'center'}
                                        fontSize='smSubHead'
                                        lineHeight='20px'
                                        color='clique.white'
                                    >
                                        {noOfVideos} videos
                                    </Text>
                                </Box>
                            </Box>
                            <Text
                                display={'flex'}
                                alignItems='center'
                                fontWeight='600'
                                fontSize='subHead'
                                lineHeight='17px'
                                letterSpacing='-0.05em'
                                color='clique.white'
                                mt='.7rem'
                            >
                                <Image
                                    src={`/assets/${smallImage}.png`}
                                    marginRight={'.7rem'}
                                    w='34px'
                                    h='34px'
                                    borderRadius='50%'
                                    objectFit={'cover'}
                                    alt=''
                                />
                                {name}
                            </Text>
                        </Box>
                    ),
                )}
            </SimpleGrid>

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
                    <NewPlaylist />
                </ModalContent>
            </Modal>
        </>
    );
};

export default Playlists;
