import Link from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';

import {Box, Button, Image, Text} from '@chakra-ui/react';

import DownloadButtons from './DownloadButtons';

const Exclusive = () => {
  const router = useRouter();
  return (
    <Box
      marginTop={{base: '5rem', lg: '6.5rem'}}
      display={{lg: 'flex'}}
      justifyContent={{lg: 'space-between', xl: 'space-around'}}
      alignItems={{lg: 'center'}}
    >
      <Box w={{lg: '530px'}} h={{lg: '100%'}}>
        <Text
          fontWeight={{base: '600', lg: '700'}}
          fontSize={{base: 'medium', lg: 'big2'}}
          lineHeight={{base: '44px', lg: '110%'}}
          letterSpacing={{base: '-0.02em', lg: '-0.5px'}}
          color='clique.white'
        >
          Deliver exclusive content to more people in real time.
        </Text>
        <Text
          fontSize={{base: 'smSubHead', lg: 'smHead'}}
          lineHeight={{base: '20px', lg: '30px'}}
          color='clique.white'
          marginTop={{base: '.75rem', lg: '1.25rem'}}
          letterSpacing='0.5px'
        >
          Circo is that platform that offers the creators more expression with
          their exclusive content. Get connected to millions of followers for
          your daily contents and real time events.
        </Text>
        <Box
          // display={{base: 'none', lg: 'flex'}}
          alignItems={'center'}
          marginTop={'2.2rem'}
        >
          <Link
            href='/signup'
            style={{
              marginRight: '1.3rem',
            }}
          >
            <Button
              background='clique.purple'
              borderRadius='30px'
              w='326px'
              h='50px'
              fontWeight='500'
              letterSpacing='0.5px'
              color='clique.white'
            >
              Get Started
            </Button>
          </Link>
        </Box>
        <Box
          display={{base: 'flex', lg: 'none'}}
          justifyContent={{
            base: 'space-between',
            sm: 'space-evenly',
          }}
          alignItems={'center'}
          marginTop='2.7rem'
          gap='10px'
        >
          <DownloadButtons baseWidth='150px' height='50px' />
        </Box>
      </Box>
      <Box
        w={{base: '316.96px', lg: '530px'}}
        h={{base: '209.07px', lg: '436px'}}
        // mx='auto'
        marginTop={'5.5rem'}
        position='relative'
        transform={{lg: 'translateY(-20%)'}}
      >
        <Image
          w={{base: '316.96px', lg: '661px'}}
          h={{base: '164px', lg: '342px'}}
          src='/assets/video-player.png'
          alt='video player'
        />
        <Image
          w={{base: '96.86px', lg: '202px'}}
          h={{base: '209.07px', lg: '436px'}}
          src='/assets/mobile-player.png'
          alt='video player'
          position='absolute'
          top={{base: '-9.5%', lg: 'auto'}}
          bottom={{lg: '-20%'}}
          left='0'
        />
        <Box
          width={{base: '34.53px', lg: '72px'}}
          height={{base: '14.39px', lg: '30px'}}
          background='clique.white'
          boxShadow='0px 2.3976px 10.0699px 4.79521px rgba(0, 0, 0, 0.25)'
          borderRadius='7.19281px'
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          position='absolute'
          top={'0'}
          right={'0'}
        >
          <Box
            mr={'.25rem'}
            width={{base: '2.88px', lg: '6px'}}
            height={{base: '2.88px', lg: '6px'}}
            background='clique.red2'
            borderRadius={'50%'}
          ></Box>
          <Text
            fontFamily='Mitr'
            fontSize={{base: 'xs', lg: 'subHead'}}
            color='clique.black2'
          >
            Live
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Exclusive;
