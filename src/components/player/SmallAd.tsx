import React from 'react';

import {Box} from '@chakra-ui/react';
import {Adsense} from '@ctrl/react-adsense';

function SmallAd({
  setIsSmallAd,
}: {
  setIsSmallAd: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  React.useEffect(() => {
    setTimeout(() => {
      setIsSmallAd(false);
    }, 5000);
  }, []);

  return (
    <Box bg='blue' pos='absolute' zIndex='2' bottom='0' minH='  80px' w='full'>
      {' '}
      <Adsense client='ca-pub-2071647719246163' slot='7595819867' />
    </Box>
  );
}

export default SmallAd;
