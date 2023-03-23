import React from 'react';

import {Box, Icon} from '@chakra-ui/react';
import {Adsense} from '@ctrl/react-adsense';
import CloseIcon from '@icons/CloseIcon';

function SmallAd({
  setIsSmallAd,
}: {
  setIsSmallAd: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setIsSmallAd(false);
  //   }, 5000);
  // }, []);

  return (
    <Box
      bg='blue'
      pos='absolute'
      zIndex='2'
      bottom='0'
      minH='80px'
      h='80px'
      w='full'
    >
      {/* <Adsense client="ca-pub-2071647719246163" slot="7595819867" /> */}
      <Icon
        onClick={() => setIsSmallAd(false)}
        as={CloseIcon}
        w='40px'
        h='40px'
        pos='absolute'
        right='0'
        cursor={'pointer'}
        color='clique.white'
      />
    </Box>
  );
}

export default SmallAd;
