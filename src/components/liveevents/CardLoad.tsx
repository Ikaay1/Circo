import React from 'react';

import { Box, Skeleton } from '@chakra-ui/react';

function CardLoader() {
  return (
    <Skeleton
      w={{base: '100%', lg: '220px', mlg: '280px', xl: 'full'}}
      h={{base: '180', mlg: '200px'}}
      rounded={'10px'}
    />
  );
}

export default CardLoader;
