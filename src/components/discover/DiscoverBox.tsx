import React from 'react';
import {useGetDiscoverQuery} from 'redux/services/content.service';

import {
  Box,
  Flex,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';

import {contentData} from '../../constants/utils';
import DiscoverCard from './DiscoverCard';

function DiscoverBox() {
  const {data, isFetching} = useGetDiscoverQuery({page: 1, limit: 10});

  return (
    <SimpleGrid columns={{base: 1, lg: 2}} spacing='20px'>
      {isFetching ? (
        <>
          {[1, 2, 3, 4].map((num) => (
            <Box
              key={num}
              h={{base: '190px', lg: '280px'}}
              position={'relative'}
            >
              <Skeleton h='100%' rounded={'20px'} w='100%' />
              <Box position='absolute' top={'5%'} left='13%' w='60%'>
                <Box display={{base: 'none', lg: 'block'}}>
                  <Skeleton w='100%' height='30px' />
                  <Skeleton w='100%' my={'.6rem'} height='30px' />
                  <Skeleton w='100%' height='30px' />
                </Box>
                <Flex mt='3rem' display={{base: 'none', lg: 'block'}}>
                  <SkeletonCircle size='20' mr='.5rem' />
                </Flex>
              </Box>
            </Box>
          ))}
        </>
      ) : (
        <>
          {data?.data?.videos.slice(0, 10).map((video: contentData) => (
            <Box key={video._id}>
              <DiscoverCard video={video} />
            </Box>
          ))}
        </>
      )}

      {/* <DiscoverCard /> */}
    </SimpleGrid>
  );
}

export default DiscoverBox;
