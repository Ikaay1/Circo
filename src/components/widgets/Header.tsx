import ProtectedRoute from 'layouts/ProtectedRoute';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {AiOutlineSearch} from 'react-icons/ai';
import {BsBroadcast} from 'react-icons/bs';
import {
  MdAddCircleOutline,
  MdMenuOpen,
  MdOutlineClose,
  MdOutlineNotificationsNone,
} from 'react-icons/md';
import {useAppDispatch, useAppSelector} from 'redux/app/hooks';
import {useGetUserQuery} from 'redux/services/user.service';
import {logout} from 'redux/slices/authSlice';

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import NotificationModal from '@components/notification/NotificationModal';
import SimpleSwitch from '@components/settings/SimpleSwitch';
import UploadModal from '@components/upload/UploadModal';
import Color from '@constants/color';

import MobileMenu from './mobileMenu/MobileMenu';

type Props = {
  upload?: () => void;
};

function Header({upload}: Props) {
  const profile = useAppSelector((store) => store.app.userReducer.channel);
  const {userProfile} = useAppSelector((store) => store.app.userReducer);

  const [searchWidth, setSearchWidth] = useState({
    base: '150px',
    lg: '300px',
  });
  const router = useRouter();
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const {data} = useGetUserQuery(userProfile?._id);
  const toast = useToast();

  useEffect(() => {
    if (data) {
      if (data?.data?.suspended) {
        toast({
          title: 'Error',
          description: 'Your account has been suspended for two weeks',
          status: 'error',
          position: 'top-right',
          duration: 3000,
          isClosable: true,
        });
        dispatch(logout());
        router.push('/login');
      }
    }
  }, [data]);

  const _handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (search) {
        router.push(`/search/${search}`);
      }
    }
  };

  const [showMenu, setShowMenu] = useState(false);
  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Flex
      alignItems={'center'}
      justifyContent='space-between'
      bg={Color().whiteAndBlack}
      px={{base: '20px', lg: '50px'}}
      py='20px'
      h='10vh'
      minH={'10vh'}
      maxH={'10vh'}
      w='100%'
      maxW={'100%'}
      overflow='hidden'
    >
      {/* First div  */}
      <Box
        w={{base: '70px', lg: '200px'}}
        cursor={'pointer'}
        onClick={() => router.push('/home')}
        maxW={{base: '70px', lg: '200px'}}
        minW={{base: '70px', lg: '200px'}}
      >
        <Image
          alt='circo logo'
          w={{base: 'full', lg: '100px'}}
          src={
            colorMode === 'dark'
              ? '/assets/Circo-Logo.png'
              : '/assets/Circo.png'
          }
        />
      </Box>

      {/* Second div */}
      <Flex
        w='full'
        px={{base: '0px', lg: '30px'}}
        pl={{base: '30px', lg: '30px'}}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <InputGroup w={searchWidth} transition='all 1s ease' mr='10px'>
          <InputLeftElement px='20px'>
            <Icon
              fontSize={'smHead'}
              color={Color().blackAndWhite}
              as={AiOutlineSearch}
              cursor={'pointer'}
              onClick={() => {
                setSearchWidth({base: '150px', lg: '500px'});
                // if (search) {
                //   router.push(`/search/${search}`);
                // }
              }}
            />
          </InputLeftElement>
          <Input
            onKeyPress={(e) => _handleKeyDown(e)}
            bg={useColorModeValue(' clique.primaryWhiteBg', 'clique.inputBg')}
            onFocus={() => setSearchWidth({base: '150px', lg: '500px'})}
            onBlur={() => setSearchWidth({base: '150px', lg: '300px'})}
            _focus={{
              boxShadow: 'none',
              border: ' 3px solid ',
              borderColor: useColorModeValue(
                'clique.secondaryGrey5',
                ' clique.inputBorder',
              ),
            }}
            border={' 2px solid '}
            borderColor={useColorModeValue(
              'clique.secondaryGrey5',
              ' clique.inputBorder',
            )}
            rounded='full'
            type='text'
            fontFamily={'Poppins'}
            _placeholder={{
              color: Color().blackAndWhite,
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search'
          />
        </InputGroup>

        <HStack alignItems={'center'}>
          <NotificationModal />
          <Flex
            display={{base: 'none', lg: 'flex'}}
            alignItems={'center'}
            justifyContent='center'
            p='2px'
            background='linear-gradient(90deg, rgba(137, 44, 220, 1), rgba(110, 147, 241, 1))'
            rounded='full'
          >
            <Avatar
              p='0'
              size='sm'
              name={profile?.name}
              src={profile?.photo}
              cursor='pointer'
              onClick={() => router.push('/profile/1/content')}
            />
          </Flex>

          <Icon
            cursor={'pointer'}
            onClick={() => setShowMenu(!showMenu)}
            display={{base: 'flex', lg: 'none'}}
            as={!showMenu ? MdMenuOpen : MdOutlineClose}
            fontSize='30px'
          />
        </HStack>
      </Flex>

      {/* third div */}
      <HStack w='300px' spacing={'20px'} display={{base: 'none', lg: 'flex'}}>
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
        <UploadModal />{' '}
        <SimpleSwitch
          text=' '
          isChecked={colorMode === 'light' ? true : false}
          name='lightOrDark'
          onChange={toggleColorMode}
        />
      </HStack>
      <MobileMenu isOpen={showMenu} close={() => setShowMenu(!showMenu)} />
    </Flex>
  );
}

export default ProtectedRoute(Header);
