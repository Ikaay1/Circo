import React from 'react';

import { Box, Image, Text } from '@chakra-ui/react';
import { subscriptionsData } from '@constants/utils';

const Subscriptions = () => {
    return (
        <Box p='1rem' pb='2.5rem'>
            <Text
                fontWeight='500'
                fontSize='smHead2'
                lineHeight='36px'
                letterSpacing='-0.02em'
                color='clique.white'
                textAlign={'center'}
            >
                Subscriptions
            </Text>
            <Box>
                {subscriptionsData.map(({name, status}) => (
                    <Box
                        display={'flex'}
                        justifyContent='space-between'
                        alignItems={'center'}
                        marginTop='.6rem'
                        key={name}
                    >
                        <Box display={'flex'} alignItems='center'>
                            <Image
                                w='57px'
                                h='57px'
                                borderRadius={'50%'}
                                objectFit='cover'
                                pr='.7rem'
                                src='/assets/subscriptionavatar.png'
                                alt=''
                            />
                            <Text
                                fontSize='subHead'
                                lineHeight='31px'
                                color='clique.white'
                            >
                                {name}
                            </Text>
                        </Box>
                        <Text
                            fontSize='sm'
                            lineHeight='26px'
                            color={
                                status === 'active'
                                    ? 'clique.green'
                                    : 'clique.red'
                            }
                        >
                            {status === 'active' ? 'Active' : 'Expired'}
                        </Text>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Subscriptions;
