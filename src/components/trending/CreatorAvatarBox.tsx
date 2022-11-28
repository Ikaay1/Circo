import React from 'react';

import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import AvataWithSpace from '@components/widgets/AvataWithSpace';

function CreatorAvatarBox({user}: {user: any}) {
  return (
    <Flex justifyContent={'center'} alignItems='center' flexDir={'column'}>
      {user.photo ? (
        <AvataWithSpace
          name='Prosper Otemuyiwa'
          url={user.photo}
          size='45px'
          borderColor='clique.brown'
          borderThickness='3px'
        />
      ) : (
        <Avatar
          size='md'
          name={user.firstName + ' ' + user.lastName}
          borderColor='clique.greenYellow'
        />
      )}
      <Text
        mt='5px'
        fontFamily={'Poppins'}
        fontSize='smSubHead'
        color={'clique.lightGrey'}
        noOfLines={1}
      >
        {user.userName}
      </Text>
    </Flex>
  );
}

export default CreatorAvatarBox;
