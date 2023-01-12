import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import { Box, Image, Text } from '@chakra-ui/react';

const Navbar = ({
  setShowSideBar,
}: {
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  return (
    <Box display='flex' justifyContent={'space-between'} alignItems='center'>
      <Box display={'flex'} alignItems='center'>
        <Box
          w='200px'
          cursor={'pointer'}
          onClick={() => router.push('/')}
          maxW='200px'
          minW='200px'
        >
          <Image alt='circo logo' w='100px' src='/assets/Circo-Logo.png' />
        </Box>
        <Text
          display={{base: 'none', lg: 'block'}}
          letterSpacing='0.5px'
          color='clique.white'
        >
          <a href='#exclusive'>About</a>
        </Text>
      </Box>
      <Box display={{base: 'none', lg: 'flex'}} alignItems='center'>
        <Text letterSpacing='0.5px' color='clique.white'>
          <Link href='/login'>Login</Link>
        </Text>
        <Text
          marginLeft={'3rem'}
          background='clique.purple'
          borderRadius='30px'
          w='221px'
          h='50px'
          display={'flex'}
          justifyContent='center'
          alignItems='center'
          cursor={'pointer'}
          onClick={() => router.push('/signup')}
        >
          <Link href='signup'>Sign Up For Free</Link>
        </Text>
      </Box>
      <Box display={{lg: 'none'}} onClick={() => setShowSideBar(true)}>
        <AiOutlineMenu style={{width: '29px', height: '55px'}} />
      </Box>
    </Box>
  );
};

export default Navbar;
