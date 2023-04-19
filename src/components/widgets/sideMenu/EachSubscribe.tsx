import {useRouter} from 'next/router';
import React from 'react';

import {Avatar, Box, Flex, Icon, Link, Text} from '@chakra-ui/react';
import Color from '@constants/color';

function EachSubscribe({
  id,
  channel_id,
}: {
  id: string;
  channel_id: {
    photo: string;
    name: string;
  };
}) {
  const router = useRouter();
  const path = router.pathname;

  return (
    <Link href={`/channel/subscribe/${id}`} textDecoration='none '>
      <Flex pl='30px' mt='15px' alignItems={'center'} cursor={'pointer'}>
        {channel_id?.photo ? (
          <Avatar size={'sm'} src={channel_id?.photo} mr='10px' />
        ) : (
          <Avatar
            size='sm'
            name={channel_id?.name}
            borderColor='clique.greenYellow'
            mr='10px'
          />
        )}
        <Text
          color={
            path === '/' + name ? 'clique.base' : Color().whiteGreyAndBlack
          }
          fontFamily={'Poppins'}
          fontWeight={500}
          textTransform={'capitalize'}
          noOfLines={1}
        >
          {channel_id?.name}
        </Text>
      </Flex>
    </Link>
  );
}

export default EachSubscribe;
