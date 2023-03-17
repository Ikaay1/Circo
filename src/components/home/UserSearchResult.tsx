import React from 'react';

import {Avatar, Box, Button, Flex, Text} from '@chakra-ui/react';

const UserSearchResult = () => {
  return (
    <Box mt='1.5rem'>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        mt='1.1rem'
        width='600px'
        background='clique.blackGrey'
        borderRadius='14px'
        px='1.4rem'
        py='.65rem'
        gap={'0 13px'}
      >
        <Flex alignItems={'center'}>
          <Flex
            flexShrink={0}
            //   onClick={() => {
            //     NProgress.start();

            //     if (
            //       event?.eventId?.fee === 0 ||
            //       event?.eventId?.fee === "0" ||
            //       !event?.eventId?.fee ||
            //       event?.paid.includes(userProfile?._id) ||
            //       event?.streamerId?._id === userProfile?._id
            //     ) {
            //       router.push(`/stream/${event?.eventId?._id}`);
            //     } else {
            //       //call paystack
            //     }

            //     NProgress.done();
            //   }}
            cursor='pointer'
            alignItems={'center'}
            justifyContent='center'
            p='4px'
            border={'4px solid'}
            borderColor={'clique.base'}
            rounded='full'
            mr='1.6rem'
          >
            <Avatar p='0' size='md' name={'Image'} src={'/woman.png'} />
          </Flex>
          <Box>
            <Text
              fontFamily='Poppins'
              fontStyle='normal'
              fontSize={'smHead2'}
              lineHeight='34px'
              color={'clique.white'}
              noOfLines={1}
            >
              The Doreen Tube
            </Text>
            <Text
              fontFamily='Poppins'
              fontStyle='normal'
              fontSize={'seventeen'}
              lineHeight='28px'
              color={'clique.secondaryGrey2'}
              mt='.16rem'
              mb='.045rem'
              noOfLines={1}
            >
              @thedoreentube
            </Text>
            <Text
              fontFamily='Poppins'
              fontStyle='normal'
              fontSize={'seventeen'}
              lineHeight='28px'
              color={'clique.secondaryGrey2'}
              noOfLines={1}
            >
              3.5M SUBSCRIBERS
            </Text>
          </Box>
        </Flex>
        <Button
          width='118.8px'
          height='39.2px'
          background='clique.base'
          borderRadius='42px'
          fontFamily='Poppins'
          fontStyle='normal'
          fontSize='smSubHead'
          lineHeight='28px'
          color='clique.white'
        >
          SUBSCRIBE
        </Button>
      </Flex>
    </Box>
  );
};

export default UserSearchResult;
