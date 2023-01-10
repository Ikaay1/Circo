import React from 'react';

import { Box } from '@chakra-ui/react';

export const ShowAuthImage = () => {
  return (
    <Box
      minW={{base: '40%', xl: '50%'}}
      bgImage={'url(/assets/auth-image.png)'}
      bgSize='cover'
      bgRepeat={'no-repeat'}
      position={'fixed'}
      left='0'
      top='0'
      height={'100vh'}
    ></Box>
  );
};

export default ShowAuthImage;
