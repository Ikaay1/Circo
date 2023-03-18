import {useRouter} from 'next/router';
import React from 'react';
import {useAppSelector} from 'redux/app/hooks';
import {useGetUsersBySearchQuery} from 'redux/services/content.service';

import {Avatar, Box, Button, Flex, Skeleton, Text} from '@chakra-ui/react';

const UserSearchResult = () => {
  const router = useRouter();
  const search = router.query?.search ? router.query?.search : '';
  const {data, isFetching} = useGetUsersBySearchQuery(search);
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  console.log('userSearch', data);

  return (
    <Box mt='1.5rem'>
      {!data && isFetching ? (
        <Box
          mt='1.1rem'
          width={{base: '100%', lg: '600px'}}
          height={{base: '100px', lg: '130px'}}
          //   position={'relative'}
        >
          <Skeleton borderRadius='14px' w='100%' h='100% ' />
          {/* <SkeletonCircle
            position={'absolute'}
            top='22%'
            left='20px'
            size={{base: '10', lg: '20'}}
          /> */}
        </Box>
      ) : !data && !isFetching ? (
        <Box color='clique.base'>No user(s) found</Box>
      ) : (
        <>
          {data?.data?.preference?.map(
            (user: {
              _id: string;
              channel_id: {
                photo: string;
                name: string;
                subscriptionFee: number;
              };
              firstName: string;
              lastName: string;
              subscribersCount: number;
              subscribers: string[];
            }) => (
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                mt='1.1rem'
                width={{base: '100%', lg: '600px'}}
                background='clique.blackGrey'
                borderRadius='14px'
                px='1.4rem'
                py='.65rem'
                gap={'0 13px'}
                key={user?._id}
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
                    <Avatar
                      p='0'
                      size={{base: 'sm', lg: 'md'}}
                      name={user?.channel_id?.name}
                      src={user?.channel_id?.photo}
                    />
                  </Flex>
                  <Box>
                    <Text
                      fontFamily='Poppins'
                      fontStyle='normal'
                      fontSize={{base: 'subHead', lg: 'smHead2'}}
                      lineHeight='34px'
                      color={'clique.white'}
                      noOfLines={1}
                    >
                      {user?.firstName + ' ' + user?.lastName}
                    </Text>
                    <Text
                      fontFamily='Poppins'
                      fontStyle='normal'
                      fontSize={{base: 'smSubHead', lg: 'seventeen'}}
                      lineHeight='28px'
                      color={'clique.secondaryGrey2'}
                      mt='.16rem'
                      mb='.045rem'
                      noOfLines={1}
                    >
                      @{user?.channel_id.name}
                    </Text>
                    <Text
                      fontFamily='Poppins'
                      fontStyle='normal'
                      fontSize={{base: 'smSubHead', lg: 'seventeen'}}
                      lineHeight='28px'
                      color={'clique.secondaryGrey2'}
                      noOfLines={1}
                    >
                      {user?.subscribersCount}{' '}
                      {user?.subscribersCount === 1
                        ? 'SUBSCRIBER'
                        : 'SUBSCRIBERS'}
                    </Text>
                  </Box>
                </Flex>
                <Button
                  width={{base: '90px', lg: '118.8px'}}
                  height={{base: '31px', lg: '39.2px'}}
                  background={
                    user?.subscribers?.includes(userProfile._id) ||
                    user?._id === userProfile._id
                      ? 'clique.grey'
                      : 'clique.base'
                  }
                  borderRadius='42px'
                  fontFamily='Poppins'
                  fontStyle='normal'
                  fontSize={{base: 'sm3', lg: 'smSubHead'}}
                  lineHeight='28px'
                  color={'clique.white'}
                  cursor={
                    user?.subscribers?.includes(userProfile._id) ||
                    user?._id === userProfile._id
                      ? 'default'
                      : 'pointer'
                  }
                  onClick={
                    user?.subscribers?.includes(userProfile._id) ||
                    user?._id === userProfile._id
                      ? () => {}
                      : () => router.push(`/channel/subscribe/${user?._id}`)
                  }
                >
                  {user?.subscribers?.includes(userProfile._id) ||
                  user?._id === userProfile._id
                    ? 'SUBSCRIBED'
                    : 'SUBSCRIBE'}
                </Button>
              </Flex>
            ),
          )}
        </>
      )}
    </Box>
  );
};

export default UserSearchResult;
