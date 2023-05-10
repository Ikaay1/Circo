import {useRouter} from 'next/router';
import React from 'react';
import {BsBroadcast} from 'react-icons/bs';
import {HiOutlineLogout} from 'react-icons/hi';
import {useAppDispatch} from 'redux/app/hooks';
import {logout} from 'redux/slices/authSlice';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  SlideFade,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import SimpleSwitch from '@components/settings/SimpleSwitch';
import UploadModal from '@components/upload/UploadModal';
import Color from '@constants/color';
import {mobileMenu} from '@constants/utils';
import {googleLogout} from '@react-oauth/google';

import EachMenu from './EachMenu';

function MobileMenu({isOpen, close}: {isOpen: boolean; close: () => void}) {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    googleLogout();
    dispatch(logout());
    window.location.href = '/login';
  };
  const router = useRouter();
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <>
      <Box
        //animate when open
        transition={'all .3s ease'}
        transform={{
          base: !isOpen ? 'translateX(-105%)' : 'translateX(0%)',
        }}
        pt='20px'
        pb='100px'
        position={'fixed'}
        left='0'
        top='10vh'
        minW='100vw'
        minH={'90vh'}
        zIndex={1000}
        pl='0px'
        pr='30px'
        bg={Color().whiteAndBlack}
        shadow='md'
      >
        <Accordion allowToggle>
          {mobileMenu.map((item, index) => (
            <EachMenu
              key={index}
              name={item.name}
              icon={item.icon}
              type={item.type}
              item={item}
              close={close}
            />
          ))}
        </Accordion>
        <Box px='50px' py='20px'>
          <Divider />
        </Box>

        <HStack pl='50px' mb='20px' spacing={'20px'}>
          <Button
            rightIcon={<Icon fontSize={'lg'} as={BsBroadcast} />}
            variant='ghost'
            rounded={'full'}
            bg='clique.base'
            color='clique.white'
            fontFamily={'Poppins'}
            size={'sm'}
            onClick={() => router.push('/golive')}
          >
            Go live
          </Button>
          <UploadModal />
        </HStack>

        <Flex
          onClick={handleLogout}
          transition={'all 0.2s ease-in-out'}
          _hover={{
            color: 'clique.base',
          }}
          cursor={'pointer'}
          justifyContent={'left'}
          alignItems='center'
          pl='50px'
        >
          <Text
            mr='10px'
            fontFamily={'Poppins'}
            fontWeight={400}
            textTransform={'capitalize'}
            fontSize={'smSubHead'}
          >
            logout
          </Text>
          <Icon fontSize={'head'} as={HiOutlineLogout} />
        </Flex>

        <Flex pl='50px' pt={'10px'} justifyContent={'left'}>
          <SimpleSwitch
            text=' '
            isChecked={colorMode === 'light' ? true : false}
            name='lightOrDark'
            onChange={toggleColorMode}
          />
        </Flex>
      </Box>
    </>
  );
}

export default MobileMenu;
