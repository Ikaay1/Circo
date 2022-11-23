import { useRouter } from 'next/router';
import React from 'react';

import { Avatar, Box, Flex, Icon, Text } from '@chakra-ui/react';

function EachSubscribe({
  name,
  imgUrl,
  firstName,
  lastName,
}: {
  name: string;
  imgUrl?: string;
  firstName: string;
  lastName: string;
}) {
  const router = useRouter();
  const path = router.pathname;

  return (
    <Flex pl='50px' mt='15px' alignItems={'center'}>
      {imgUrl ? (
        <Avatar size={'sm'} src={imgUrl} mr='10px' />
      ) : (
        <Avatar
          size='sm'
          name={firstName + ' ' + lastName}
          borderColor='clique.greenYellow'
          mr='10px'
        />
      )}
      <Text
        color={path === '/' + name ? 'clique.base' : 'clique.whiteGrey'}
        fontFamily={'Poppins'}
        fontWeight={500}
        textTransform={'capitalize'}
      >
        {name}
      </Text>
    </Flex>
  );
}

export default EachSubscribe;
