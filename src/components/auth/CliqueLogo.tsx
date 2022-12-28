import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { Box, Image } from '@chakra-ui/react';

export const CliqueLogo = () => {
  const router = useRouter();
  return (
    <Box
      w={{base: '70px', lg: '200px'}}
      cursor={'pointer'}
      onClick={() => router.push('/')}
      maxW={{base: '70px', lg: '200px'}}
      minW={{base: '70px', lg: '200px'}}
      position={'absolute'}
      top='4%'
      left='5%'
    >
      <Image
        alt='circo logo'
        w={{base: 'full', lg: '100px'}}
        src='/assets/Circo-Logo.png'
      />
    </Box>
  );
};

export default CliqueLogo;
