import {useRouter} from 'next/router';
import React from 'react';

import {Avatar, Box, Flex, Text} from '@chakra-ui/react';
import AvataWithSpace from '@components/widgets/AvataWithSpace';

function CreatorAvatarBox({user}: {user: any}) {
  const router = useRouter();
  return (
    <Flex
      cursor={'pointer'}
      justifyContent={'center'}
      onClick={() =>
        router.push(`/channel/subscribe/${user?.channel_id?.name}`)
      }
      alignItems='center'
      flexDir={'column'}
    >
      {user?.channel_id?.photo ? (
        <AvataWithSpace
          name='Prosper Otemuyiwa'
          url={user?.channel_id?.photo}
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
        {user?.channel_id?.name.slice(0, 5)}
        {user?.channel_id?.name.length > 5 ? '...' : ''}
      </Text>
    </Flex>
  );
}

export default CreatorAvatarBox;
