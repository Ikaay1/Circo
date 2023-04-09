import React from 'react';

import {Box, Image, Text} from '@chakra-ui/react';

import DownloadButtons from './DownloadButtons';

const Creative = () => {
  return (
    <>
      <Text
        fontWeight='600'
        fontSize={{base: 'smHead', lg: 'big2'}}
        lineHeight={{base: 'medium', lg: 'xl'}}
        textAlign='center'
        letterSpacing='-0.02em'
        color='clique.white'
      >
        Become that Creative you desire
      </Text>
      <Text
        fontSize={{base: 'smSubHead', lg: 'smHead'}}
        lineHeight={{base: '129%', lg: '150%'}}
        textAlign='center'
        color='clique.white'
        mt='.5rem'
      >
        Channel your inner Picasso  and start creating content to be monetized
      </Text>
      <Box
        mt={{base: '3rem', lg: '10rem'}}
        position={{lg: 'relative'}}
        w={{lg: '1122px'}}
        mx={{lg: 'auto'}}
      >
        <Box w={{lg: '1122px'}}>
          {/* <Image
            src='/assets/vid.png'
            w={{base: '344px', lg: '100%'}}
            mx={{base: 'auto'}}
            alt=''
            display={{lg: 'none'}}
          /> */}
          <Image
            src='/assets/big-vid.png'
            w={{base: '344px', lg: '100%'}}
            mx={{base: 'auto'}}
            alt=''
            // display={{base: 'none', lg: 'block'}}
          />
        </Box>
        <Box
          mt={{base: '1.7rem'}}
          display={{base: 'flex'}}
          justifyContent={{base: 'space-between'}}
        >
          <Box
            w={{base: '132px', lg: '321px'}}
            h={{base: '285.79px', lg: '695px'}}
            position={{lg: 'absolute'}}
            top={{lg: '-8.4%'}}
            right={{lg: '0'}}
          >
            {/* <Image
              src='/assets/mobile-vid.png'
              w={'100%'}
              h={'100%'}
              alt=''
              display={{lg: 'none'}}
            /> */}
            <Image
              src='/assets/big-mobile-vid.png'
              alt=''
              // display={{base: 'none', lg: 'block'}}
            />
          </Box>
          <Box
            display={{base: 'flex'}}
            flexDirection={{base: 'column', lg: 'row'}}
            justifyContent={{base: 'center', lg: 'center'}}
            alignItems={{base: 'center', lg: 'center'}}
            w={{lg: '100%'}}
            mt={{lg: '6.5rem'}}
          >
            <DownloadButtons
              baseWidth='162px'
              height='42.91px'
              marginBottom='1.4rem'
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Creative;
