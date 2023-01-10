import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { Box, Image, useColorMode } from '@chakra-ui/react';

export const CliqueLogo = () => {
  const router = useRouter();
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Box
      w={{base: '70px', lg: '200px'}}
      cursor={'pointer'}
      onClick={() => router.push('/login')}
      maxW={{base: '70px', lg: '200px'}}
      minW={{base: '70px', lg: '200px'}}
      position={'fixed'}
      top='4%'
      left='5%'
      zIndex={99}
    >
      <Image
        alt='circo logo'
        w={{base: 'full', lg: '100px'}}
        src={
          colorMode === 'dark' ? '/assets/Circo-Logo.png' : '/assets/Circo.png'
        }
      />
    </Box>
  );
};

export default CliqueLogo;
