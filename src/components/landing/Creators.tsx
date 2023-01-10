import React from 'react';

import { Box, Image, Text } from '@chakra-ui/react';
import { famousCreatorsImageData } from '@constants/utils';

const Creators = () => {
  return (
    <>
      <Text
        fontWeight='600'
        fontSize='smHead'
        lineHeight='36px'
        textAlign='center'
        letterSpacing='-0.02em'
        color='clique.black4'
        display={{lg: 'none'}}
      >
        Become that Creative you desire
      </Text>
      <Text
        fontWeight='700'
        fontSize='big2'
        lineHeight='59px'
        textAlign='center'
        color='clique.black2'
        display={{base: 'none', lg: 'block'}}
      >
        Famous Creators on our platform
      </Text>
      <Text
        fontSize={{base: 'smSubHead', lg: 'smHead'}}
        lineHeight={{base: '129%', lg: '150%'}}
        textAlign='center'
        color={{base: '#000000', lg: '#141516'}}
        mt={{base: '.4rem'}}
      >
        At the end of the day have fun with celebrities
      </Text>
      <Box position='relative' zIndex={'0'}>
        <Box
          height={{base: '80px', lg: '264px'}}
          borderRadius={'40%'}
          zIndex='99999'
          backgroundColor={'clique.white'}
        ></Box>
        <Box
          position={'absolute'}
          bottom={{base: '-130px', lg: '-435px'}}
          zIndex={'-2'}
          display='flex'
          justifyContent={'space-between'}
          w='100%'
          className='track'
        >
          {famousCreatorsImageData.map((image) => (
            <Image
              w={{
                base: '80px',
                sm: '100px',
                md: '170px',
                lg: '238px',
                xl: '342px',
              }}
              h={{base: '159.79px', lg: '544px'}}
              src={`/assets/${image}.png`}
              alt=''
              objectFit={'cover'}
              key={image}
            />
          ))}
          {/* <Image
            w={{lg: '238px', xl: '342px'}}
            h='544px'
            src='/assets/celeb5.png'
            alt=''
            objectFit={'cover'}
            display={{base: 'none', lg: 'inline'}}
          /> */}
        </Box>
        <Box
          height={{base: '80px', lg: '264px'}}
          borderRadius={'40%'}
          // zIndex='5'
          backgroundColor={'clique.white'}
          position='absolute'
          bottom={{base: '-170px', lg: '-601px'}}
          w='100%'
        ></Box>
      </Box>
    </>
  );
};

export default Creators;
