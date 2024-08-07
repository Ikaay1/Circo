import {useRouter} from 'next/router';
import React from 'react';
import {useSubscribeMutation} from 'redux/services/user.service';

import {
  Avatar,
  Box,
  Button,
  Flex,
  SlideFade,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import AvataWithSpace from '@components/widgets/AvataWithSpace';
import Color from '@constants/color';

function SubcribeOverLay({isHover, user}: {isHover: boolean; user: any}) {
  const router = useRouter();
  return (
    <Flex
      w='full'
      rounded={'20px'}
      bgImage='/assets/overlayBg.png'
      bgSize={'cover'}
    >
      <Box w='50%' bg='transparent'>
        <SlideFade in={isHover} offsetX='-80px' offsetY={'0'}>
          <Box
            h='220px'
            rounded={'20px'}
            bgImage='/assets/grey-logo.png'
            bgSize={'70px'}
            bgRepeat={'no-repeat'}
            bgPosition={'left'}
          />
        </SlideFade>
      </Box>

      <Box w='50%'>
        <SlideFade in={isHover} offsetX='80px' offsetY={'0'}>
          <Box h='220px' pt='40px' rounded={'20px'} bg='clique.base'>
            <Flex
              justifyContent={'center'}
              alignItems='center'
              flexDir={'column'}
            >
              {user?.photo ? (
                <AvataWithSpace
                  name='Prosper Otemuyiwa'
                  url={user.photo}
                  size='50px'
                  avatarSize='40px'
                  borderColor='clique.white'
                  borderThickness='2px'
                />
              ) : (
                <Avatar
                  size='md'
                  name={user.firstName + ' ' + user.lastName}
                  borderColor='clique.greenYellow'
                />
              )}
              <Text
                fontFamily={'Poppins'}
                fontSize='smHead'
                fontWeight={700}
                color={Color().blackAndWhite}
                noOfLines={1}
              >
                {user.userName}
              </Text>

              <Button
                mt='20px'
                bg='none'
                rounded={'full'}
                fontWeight='400'
                onClick={() =>
                  router.push(`/channel/${user?.channel_id?.name}`)
                }
              >
                Subscribe
              </Button>
            </Flex>
          </Box>
        </SlideFade>
      </Box>
    </Flex>
  );
}

export default SubcribeOverLay;
