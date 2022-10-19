import React from 'react';

import { Box, Icon, Image, Text } from '@chakra-ui/react';
import { playListData } from '@constants/utils';
import AddPlaylistIcon from '@icons/AddPlaylistIcon';

import VideoIcon from '../../assets/icons/VideoIcon';

const Playlists = () => {
    return (
        <>
            <Text
                display='flex'
                alignItems={'center'}
                fontSize='24px'
                lineHeight='32px'
                color='clique.white'
            >
                New Playlist <Icon as={AddPlaylistIcon} />
            </Text>
            <Box mt={'2.5rem'} display='flex' justifyContent={'space-between'}>
                {playListData.map(
                    ({bigImage, smallImage, name, noOfVideos}) => (
                        <Box key={bigImage}>
                            <Box
                                w={{lg: '325px', xl: '363px'}}
                                h={{lg: '210px', xl: '226px'}}
                                position={'relative'}
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
                                        fontSize='14px'
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
                                fontSize='18px'
                                lineHeight='17px'
                                letterSpacing='-0.05em'
                                color='#FFFFFF'
                                mt='.7rem'
                            >
                                <Image
                                    src={`/assets/${smallImage}.png`}
                                    marginRight={'.7rem'}
                                    w='34px'
                                    h='34px'
                                    borderRadius='50%'
                                    alt=''
                                />
                                {name}
                            </Text>
                        </Box>
                    ),
                )}
            </Box>
        </>
    );
};

export default Playlists;
