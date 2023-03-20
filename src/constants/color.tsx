import React from 'react';

import {useColorModeValue} from '@chakra-ui/react';

function Color() {
  const blackAndWhite = useColorModeValue('clique.black', 'clique.whiteGrey');
  const blackAndPureWhite = useColorModeValue('clique.black', 'clique.white');
  const blackAndWhite2 = useColorModeValue('clique.black', 'clique.white');
  const greyAndWhite = useColorModeValue(
    'clique.lightPrimaryBg',
    'clique.secondaryGrey1',
  );
  const greyAndWhite2 = useColorModeValue(
    'clique.white',
    'clique.secondaryGrey1',
  );
  const whiteAndBlack = useColorModeValue('clique.white', 'clique.black');
  const whiteAndBlackGrey = useColorModeValue(
    'clique.white',
    'clique.blackGrey',
  );
  const blackAndGrey = useColorModeValue('clique.black', 'clique.grey');
  const whiteGreyAndBlack = useColorModeValue(
    'clique.black',
    'clique.whiteGrey',
  );
  const blackAndWhiteGrey = useColorModeValue(
    'clique.lightPrimaryBg',
    'clique.grey',
  );
  const greyAndPureWhite = useColorModeValue('clique.white', 'clique.grey');

  const lightAndPrimary = useColorModeValue(
    'clique.lightPrimaryBg',
    'clique.primaryBg',
  );

  return {
    whiteAndBlack,
    blackAndWhite,
    whiteGreyAndBlack,
    blackAndGrey,
    blackAndWhiteGrey,
    lightAndPrimary,
    greyAndWhite,
    blackAndPureWhite,
    greyAndPureWhite,
    blackAndWhite2,
    greyAndWhite2,
    whiteAndBlackGrey,
  };
}

export default Color;
