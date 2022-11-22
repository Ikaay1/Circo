import React from 'react';
import { useSubscribeMutation } from 'redux/services/user.service';

import { Avatar, Box, Button, Flex, SlideFade, Text } from '@chakra-ui/react';
import AvataWithSpace from '@components/widgets/AvataWithSpace';

function SubcribeOverLay({
  isHover,
  user,
  refetch,
}: {
  isHover: boolean;
  user: any;
  refetch: any;
}) {
  const [subscribe] = useSubscribeMutation();
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
                fontSize='head'
                fontWeight={700}
                color={'clique.black'}
              >
                {user.userName}
              </Text>

              <Button
                mt='20px'
                bg='none'
                rounded={'full'}
                fontWeight='400'
                onClick={async () => {
                  await subscribe({subscribingToId: user._id});
                  refetch();
                }}
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
