import {useRouter} from 'next/router';
import React from 'react';

import {Box, Image} from '@chakra-ui/react';

const CliqueLoader = () => {
  const router = useRouter();
  return (
    <Box
      display='flex'
      w={'100%'}
      height='100%'
      justifyContent={'center'}
      alignItems='center'
    >
      <Image
        src='/assets/circo-loader.png'
        alt='clique-loader'
        className='clique-loader'
        w={'100%'}
        height='100%'
        objectFit='cover'
      />
    </Box>
  );
};

export default CliqueLoader;
