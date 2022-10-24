import React from 'react';

import { Box, Image, Text } from '@chakra-ui/react';

const ProfileDetails = () => {
    return (
        <Box>
            <Image
                src='/assets/profilephoto.png'
                alt='profile photo'
                borderRadius='50%'
                objectFit={'cover'}
                margin='0 auto'
                h='120px'
                w='120px'
            />

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
                color='clique.secondaryGrey2'
                textAlign={'center'}
            >
                2.3M Subscribers
            </Text>
        </Box>
    );
};

export default ProfileDetails;
