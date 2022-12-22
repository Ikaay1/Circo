import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';

import { Box, Image, Text } from '@chakra-ui/react';
import { sideBarData } from '@constants/utils';

const Sidebar = ({
  showSideBar,
  setShowSideBar,
}: {
  showSideBar: boolean;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Box
      bg='#171717'
      px='1rem'
      py='2rem'
      position={'fixed'}
      top='0'
      right='0'
      w={'100%'}
      h='100%'
      transition='all .2s ease'
      transform={{
        base: showSideBar ? 'translateX(0%)' : 'translateX(105%)',
      }}
    >
      <Box display={'flex'} justifyContent='space-between' mt={'1.5rem'}>
        <Box
          display={'flex'}
          alignItems='center'
          fontWeight={'700'}
          fontSize={{base: 'subHead', lg: 'smHead2'}}
          letterSpacing={{
            base: '0.500386px',
            lg: '0.709173px',
          }}
          color='clique.white'
        >
          <Image
            src='/assets/clique-logo.png'
            alt='clique-logo'
            width={{base: '32.02px', lg: '45.39px'}}
            height={{base: '36.16px', lg: '51.24px'}}
          />
          <Link href='/'>CIRCO</Link>
        </Box>
        <Image
          onClick={() => setShowSideBar(false)}
          src='/assets/menu.png'
          alt=''
          cursor='pointer'
        />
      </Box>
      <Box mt='5rem'>
        {sideBarData.map(({key, detail}) => (
          <Text
            key={key}
            fontSize='smHead'
            lineHeight='28px'
            color='clique.white'
            mt={'1.45rem'}
          >
            {detail}
          </Text>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
