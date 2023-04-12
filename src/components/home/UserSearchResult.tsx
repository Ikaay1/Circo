import {useRouter} from 'next/router';
import React from 'react';
import {useGetUsersBySearchQuery} from 'redux/services/content.service';

import {Box, Skeleton} from '@chakra-ui/react';

import SearchResultCard from './SearchResultCard';

const UserSearchResult = () => {
  const router = useRouter();
  const search = router.query?.search ? router.query?.search : '';
  const {data, isFetching} = useGetUsersBySearchQuery(search);
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
                subscriptionInfo: string;
                bio: string;
                userId: string;
              };
              firstName: string;
              lastName: string;
              subscribersCount: number;
              subscribers: string[];
            }) => (
              <SearchResultCard user={user} key={user?._id} />
            ),
          )}
        </>
      )}
    </Box>
  );
};

export default UserSearchResult;
