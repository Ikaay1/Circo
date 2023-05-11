import {useRouter} from 'next/router';
import React from 'react';

import {
  Box,
  Flex,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Color from '@constants/color';
import HomeIcon from '@icons/HomeIcon';

function EachMenu({name, icon}: {name: string; icon: any}) {
  const router = useRouter();
  const path = router.pathname;

  return (
    <Flex
      mt='5px'
      cursor={'pointer'}
      onClick={
        name === 'profile'
          ? () => router.push(`/${name}/content`)
          : name === 'Your channel'
          ? () => router.push(`/channel/content`)
          : () => router.push(`/${name.replace(/\s/g, '').toLowerCase()}`)
      }
      h='40px'
      position={'relative'}
      _before={{
        content: '""',
        display:
          path === '/' + name.replace(/\s/g, '').toLowerCase()
            ? 'block'
            : 'none',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 0,
        width: '6px',
        height: '25px',
        background: 'clique.base',
        borderRightRadius: '4px',
        boxShadow: '10px 0px 18px #892CDC',
      }}
    >
      <Flex
        pl='50px'
        _hover={{
          color: 'clique.base',
        }}
        transition={'all 0.2s ease-in-out'}
        color={
          path === '/' + name.replace(/\s/g, '').toLowerCase()
            ? 'clique.base'
            : Color().blackAndWhite
        }
        alignItems={'center'}
      >
        <Icon as={icon} mr='15px' />
        <Text
          fontFamily={'Poppins'}
          fontWeight={500}
          textTransform={'capitalize'}
        >
          {name}
        </Text>
      </Flex>
    </Flex>
  );
}

export default EachMenu;
