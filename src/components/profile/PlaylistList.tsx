import React from 'react';

import { Box, Icon, Image, Text } from '@chakra-ui/react';

import MoreIcon from '../../assets/icons/MoreIcon';

const PlaylistList = () => {
    return (
        <>
            <Box>
                {[1, 2, 3, 4, 5, 6, 7].map((item, i) => (
                    <Box
                        display={'flex'}
                        justifyContent='space-between'
                        alignItems={'center'}
                        mt={i !== 0 ? '1.4rem' : '0em'}
                        key={item}
                    >
                        <Box display={'flex'} alignItems={'center'}>
                            <Box mr={'1rem'}>
                                <Image
                                    src='/assets/pinkstarsmall.png'
                                    w='75px'
                                    h='75px'
                                    objectFit={'cover'}
                                    borderRadius='10px'
                                    alt='user image'
                                />
                            </Box>
                            <Box>
                                <Text
                                    fontWeight='500'
                                    fontSize='smSubHead'
                                    lineHeight='28px'
                                    color='clique.white'
                                    mb='.5rem'
                                >
                                    RUSH VIDEO - ALABAMA OJOTA
                                </Text>
                                <Text
                                    fontSize='sm'
                                    lineHeight='24px'
                                    color='clique.secondaryGrey2'
                                >
                                    Ayra Star
                                </Text>
                            </Box>
                        </Box>
                        <Box cursor={'pointer'}>
                            <Icon as={MoreIcon} />
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default PlaylistList;
