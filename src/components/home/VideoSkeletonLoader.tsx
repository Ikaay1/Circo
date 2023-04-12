import React from 'react';

import {
  Box,
  Flex,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  useColorModeValue,
} from '@chakra-ui/react';

const VideoSkeletonLoader = () => {
  const value = useColorModeValue('clique.lightPrimaryBg', 'clique.blackGrey');
  return (
    <SimpleGrid
      mt='20px'
      bg={value}
      columns={{base: 1, lg: 3, mlg: 3, xl: 4}}
      spacing={'30px'}
      width={{base: '100%', lg: 'calc(100vw - 560px)'}}
    >
      {[1, 2, 3].map((num) => (
        <Box key={num} w='full'>
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
