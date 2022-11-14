import React from 'react';

import { Box, Icon, Image, Text } from '@chakra-ui/react';
import { shareData } from '@constants/utils';
import CopyLinkIcon from '@icons/CopyLinkIcon';
import ChannelInput from './ChannelInput';

const CopyBox = () => {
    return (
        <Box p='1.5rem' backgroundColor={'clique.black2'} pb='2rem'>
            <Text fontSize='smHead' lineHeight='32px' color='clique.white'>
                Share
            </Text>
            <Box mt='2rem' display='flex' alignItems={'center'}>
                {shareData.map((icon) => (
                    <Box
                        w='85px'
                        h='85px'
                        borderRadius={'50%'}
                        backgroundColor='clique.secondaryGrey1'
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        mr='1.3rem'
                        key={icon}
                    >
                        <Image
                            w='50px'
                            h='50px'
                            objectFit={'cover'}
                            src={`/assets/${icon}.png`}
                            alt=''
                        />
                    </Box>
                ))}
            </Box>
            <Box mt='3rem' height={'55px'} position={'relative'}>
                <ChannelInput value='https://www.clique.com/h7hsi82nsiw93nd' />
                <Box
                    position='absolute'
                    top='50%'
                    right={'3.5%'}
                    transform={'translateY(-50%)'}
                    fontSize='sm'
                    color='clique.secondaryGrey2'
                    cursor='pointer'
                >
                    <Icon as={CopyLinkIcon} />
                </Box>
            </Box>
        </Box>
    );
};

export default CopyBox;
