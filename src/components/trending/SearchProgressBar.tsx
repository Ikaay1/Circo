import React from 'react';

import { Box, Flex, Progress, Text } from '@chakra-ui/react';

import SearchInterface from '../../constants/interface';

function SearchProgressBar({searchWord}: {searchWord: SearchInterface}) {
  return (
    <Box mb='15px'>
      <Flex justifyContent={'space-between'}>
        <Text noOfLines={1} fontSize={'smSubHead'} fontFamily={'Poppins'}>
          {searchWord.word}
        </Text>
        <Text fontFamily={'Poppins'} fontSize={'smSubHead'}>
          {searchWord.count}
        </Text>
      </Flex>

      <Progress
        colorScheme='yellow'
        size={'sm'}
        rounded={'full'}
        value={50}
        color='red'
        background='clique.progressBg'
        sx={{
          '& > div': {
            background: 'clique.yellow',
            borderRadius: 'full',
          },
        }}
      />
    </Box>
  );
}

export default SearchProgressBar;
