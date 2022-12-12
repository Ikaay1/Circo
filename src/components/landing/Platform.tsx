import React from 'react';

import { Box, Image, Text } from '@chakra-ui/react';
import { cliquePlatformData1, cliquePlatformData2 } from '@constants/utils';

const Platform = () => {
  return (
    <>
      <Text
        fontWeight={{base: '600', lg: '700'}}
        fontSize={{base: 'smHead', lg: 'big2'}}
        color='clique.black3'
        textAlign={'center'}
      >
        One-Clique-Platform
      </Text>
      <Text
        fontSize={{base: 'smSubHead', lg: 'smHead'}}
        lineHeight={{base: '21px', lg: '35.5px'}}
        textAlign='center'
        color='clique.black3'
        mt={'.9rem'}
      >
        You take care of your content choice, and we’ll take care of the rest.
      </Text>
      <Box>
        <Box
          mt={'3.5rem'}
          display={{lg: 'flex'}}
          justifyContent={{
            lg: 'space-between',
            xl: 'space-around',
          }}
        >
          {cliquePlatformData1.map(({key, name, detail, image}, i) => (
            <Box mt={'2.8rem'} w={{lg: '387px'}} key={key}>
              <Box
                fontWeight='600'
                fontSize='sm2'
                color='clique.black2'
                display={'flex'}
                alignItems='center'
              >
                <Image
                  src={`/assets/${image}.png`}
                  alt='money logo'
                  mr={'.8rem'}
                />
                {name}
              </Box>
              <Text
                fontSize={{base: 'sm', lg: 'smSubHead'}}
                lineHeight={{base: '20px', lg: '24px'}}
                color='clique.black2'
                pr={{
                  lg: i !== 2 ? '1rem' : '0rem',
                  sm: '0rem',
                }}
                mt={{lg: '.5rem'}}
              >
                {detail}
              </Text>
            </Box>
          ))}
        </Box>
        <Box
          mt={'3.5rem'}
          display={{lg: 'flex'}}
          justifyContent={{
            lg: 'space-between',
            xl: 'space-around',
          }}
        >
          {cliquePlatformData2.map(({key, name, detail, image}, i) => (
            <Box mt={'2.8rem'} w={{lg: '400px'}} key={key}>
              <Box
                fontWeight='600'
                fontSize='sm2'
                color='clique.black2'
                display={'flex'}
                alignItems='center'
              >
                <Image
                  src={`/assets/${image}.png`}
                  alt='money logo'
                  mr={'.8rem'}
                />
                {name}
              </Box>
              <Text
                fontSize={{base: 'sm', lg: 'smSubHead'}}
                lineHeight={{base: '20px', lg: '24px'}}
                color='clique.black2'
                pr={{
                  lg: i !== 2 ? '1rem' : '0rem',
                  sm: '0rem',
                }}
                mt={{lg: '.5rem'}}
              >
                {detail}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Platform;
