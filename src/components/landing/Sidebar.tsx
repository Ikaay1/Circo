import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {Dispatch, SetStateAction} from 'react';

import {Box, Image, Text} from '@chakra-ui/react';
import {sideBarData} from '@constants/utils';

const Sidebar = ({
  showSideBar,
  setShowSideBar,
}: {
  showSideBar: boolean;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
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
          w={{base: '70px', lg: '200px'}}
          cursor={'pointer'}
          onClick={() => router.push('/')}
          maxW={{base: '70px', lg: '200px'}}
          minW={{base: '70px', lg: '200px'}}
        >
          <Image
            alt='circo logo'
            w={{base: 'full', lg: '100px'}}
            src='/assets/Circo-Logo.png'
          />
        </Box>
        <Image
          onClick={() => setShowSideBar(false)}
          src='/assets/menu.png'
          alt=''
          cursor='pointer'
        />
      </Box>
      <Box mt='5rem'>
        {sideBarData.map(({key, detail, link}) => (
          <Text
            key={key}
            fontSize='smHead'
            lineHeight='28px'
            color='clique.white'
            mt={'1.45rem'}
          >
            <Link href={link}>{detail}</Link>
          </Text>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
