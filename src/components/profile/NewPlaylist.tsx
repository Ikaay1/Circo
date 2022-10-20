import React from 'react';

import { Box, Icon, Text } from '@chakra-ui/react';
import AddnewIcon from '@icons/AddnewIcon';
import UploadPlaylistIcon from '@icons/UploadPlaylistIcon';

const NewPlaylist = () => {
    return (
        <Box bg='clique.black' w='420px' p='1rem'>
            <Box>
                <Text
                    fontWeight='500'
                    fontSize='22px'
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
            <Box mt='1.1rem'>
                <Text
                    fontWeight='500'
                    fontSize='22px'
                    lineHeight='36px'
                    letterSpacing='-0.02em'
                    color='clique.secondaryGrey2'
                    textAlign={'center'}
                >
                    Playlist Name
                </Text>
                <Box mt='1rem'>
                    <textarea
                        placeholder='Playlist description'
                        className='playlist'
                        cols={30}
                        rows={10}
                    ></textarea>
                </Box>
            </Box>
            <Box display={'flex'} mt='1.7rem'>
                <Box mr={'.8rem'}>
                    <Icon as={AddnewIcon} />
                </Box>
                <Text
                    fontSize='17px'
                    lineHeight='32px'
                    color='clique.secondaryGrey2'
                >
                    Add Video
                </Text>
            </Box>
            <Box
                background='#892CDC'
                borderRadius='50px'
                fontWeight='500'
                fontSize='22px'
                lineHeight='36px'
                display='flex'
                alignItems='center'
                justifyContent={'center'}
                letterSpacing='-0.02em'
                color='#FFFFFF'
                w='100%'
                h='65px'
                mt='1.5rem'
            >
                Create new Playlist
            </Box>
        </Box>
    );
};

export default NewPlaylist;
