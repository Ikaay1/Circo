import React from 'react';

import { Box, Image } from '@chakra-ui/react';

const CliqueLoader = () => {
  return (
    <Box
      display='flex'
      w={'100%'}
      height='100%'
      justifyContent={'center'}
      alignItems='center'
    >
      <Image
        src='/assets/clique-loader.png'
        alt='clique-loader'
        className='clique-loader'
      />
    </Box>
  );
};

export default CliqueLoader;
