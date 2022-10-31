import React from 'react';

import { Image, Text } from '@chakra-ui/react';

const DownloadButtons = ({
  baseWidth,
  height,
  marginBottom,
}: {
  baseWidth: string;
  height: string;
  marginBottom?: string;
}) => {
  return (
    <>
      <Text
        width={{
          base: baseWidth,
          sm: '200px',
          md: '250px',
          lg: '275.58',
        }}
        height={{base: height, lg: '73px'}}
        background='clique.white'
        borderRadius={{base: '10.7285px', lg: '18.25px'}}
        fontSize={{base: 'sm3', lg: 'sm2'}}
        lineHeight={{base: '21px', lg: '36px'}}
        textAlign='center'
        color='clique.black3'
        display={'flex'}
        justifyContent='center'
        alignItems='center'
        mb={{
          base: marginBottom ? '1.4rem' : '0rem',
          lg: marginBottom ? '0rem' : '0rem',
        }}
        mr={{lg: '3.4rem'}}
      >
        Apple App Store{' '}
        <Image
          src='/assets/apple-icon.png'
          alt='apple icon'
          marginLeft={'.6rem'}
          w={{lg: '36.5px'}}
          h={{lg: '36.5px'}}
        />
      </Text>
      <Text
        width={{
          base: baseWidth,
          sm: '200px',
          md: '250px',
          lg: '275.58',
        }}
        height={{base: height, lg: '73px'}}
        background='clique.black3'
        borderRadius={{base: '10.7285px', lg: '18.25px'}}
        fontSize={{base: 'sm3', lg: 'sm2'}}
        textAlign='center'
        color='clique.white'
        display={'flex'}
        justifyContent='center'
        alignItems='center'
      >
        Google PlayStore{' '}
        <Image
          src='/assets/google-icon.png'
          alt='google icon'
          marginLeft={'.6rem'}
          w={{lg: '45.63px'}}
          h={{lg: '41.25px'}}
        />
      </Text>
    </>
  );
};

export default DownloadButtons;
