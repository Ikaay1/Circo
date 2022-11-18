import React from 'react';

import {
	Box,
	Flex,
	SimpleGrid,
	Skeleton,
	SkeletonCircle,
} from '@chakra-ui/react';

const VideoSkeletonLoader = () => {
  return (
    <SimpleGrid
      mt='20px'
      w='100%'
      bg='clique.blackGrey'
      p='10px'
      columns={{lg: 3, xl: 4}}
      spacing={'30px'}
    >
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <Box key={num} h={'100%'} w={{lg: '230px', xl: '310px'}}>
          <Skeleton h='150px' borderRadius='10px' />
          <Flex mt={'.5rem'} alignItems='center' w='100%'>
            <SkeletonCircle size='10' mr='.5rem' />
            <Box w='100%'>
              <Skeleton w='100%' height='10px' />
              <Skeleton w='100%' my={'3px'} height='10px' />
              <Skeleton w='100%' height='10px' />
            </Box>
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default VideoSkeletonLoader;
