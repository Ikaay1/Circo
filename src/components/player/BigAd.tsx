import React, {useEffect} from 'react';

import {Box, Icon} from '@chakra-ui/react';
import {Adsense} from '@ctrl/react-adsense';
import CloseIcon from '@icons/CloseIcon';

function BigAd({
  setIsAd,
  setIsSmallAd,
  playerRef,
}: {
  setIsAd: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSmallAd: React.Dispatch<React.SetStateAction<boolean>>;
  playerRef: any;
}) {
  return (
    <Box bg='red' minH='calc(100% - 80px)' pos='absolute' zIndex='2' w='full'>
      {/* <Adsense client='ca-pub-2071647719246163' slot='7595819867' /> */}
      <Icon
        onClick={() => setIsAd(false)}
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

export default BigAd;
