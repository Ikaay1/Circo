import React from 'react';

import { Avatar, Box, Image, Text } from '@chakra-ui/react';

const Subscriptions = ({userData}: {userData: any}) => {
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
        {userData?.data?.subscribers.map(
          ({
            firstName,
            lastName,
            _id,
            photo,
          }: {
            firstName: string;
            lastName: string;
            _id: string;
            photo?: string;
          }) => (
            <Box
              display={'flex'}
              justifyContent='space-between'
              alignItems={'center'}
              marginTop='.6rem'
              key={_id}
            >
              <Box display={'flex'} alignItems='center'>
                {photo ? (
                  <Image
                    w='57px'
                    h='57px'
                    borderRadius={'50%'}
                    objectFit='cover'
                    pr='.7rem'
                    src={photo}
                    alt=''
                  />
                ) : (
                  <Avatar
                    size='md'
                    mr='.7rem'
                    name={firstName + ' ' + lastName}
                    borderColor='clique.greenYellow'
                  />
                )}

                <Text fontSize='subHead' lineHeight='31px' color='clique.white'>
                  {firstName + ' ' + lastName}
                </Text>
              </Box>
              <Text
                fontSize='sm'
                lineHeight='26px'
                color={'active' === 'active' ? 'clique.green' : 'clique.red'}
              >
                {'active' === 'active' ? 'Active' : 'Expired'}
              </Text>
            </Box>
          ),
        )}
      </Box>
    </Box>
  );
};

export default Subscriptions;
