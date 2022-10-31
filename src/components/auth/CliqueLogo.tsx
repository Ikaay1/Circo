import Link from 'next/link';
import React from 'react';

import { Box, Image } from '@chakra-ui/react';

export const CliqueLogo = () => {
  return (
    <Box
      display={'flex'}
      alignItems='center'
      fontWeight={{lg: '700'}}
      fontSize='smHead2'
      letterSpacing='0.709173px'
      color='clique.white'
      position={'absolute'}
      top='4%'
      left='5%'
    >
      <Image src='/assets/clique-logo.png' alt='clique-logo' />
      <Link href='/'>CLIQUE</Link>
    </Box>
  );
};

export default CliqueLogo;
