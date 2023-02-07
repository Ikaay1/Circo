import { useRouter } from 'next/router';
import React from 'react';
import { useGetIndividualChannelQuery } from 'redux/services/channel.service';

import { Avatar, Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import Color from '@constants/color';

function EachSubscribe({
  name,
  imgUrl,
  firstName,
  lastName,
  id,
}: {
  name: string;
  imgUrl?: string;
  firstName: string;
  lastName: string;
  id: string;
}) {
  const router = useRouter();
  const path = router.pathname;
  const {data, isLoading} = useGetIndividualChannelQuery(id);

  return (
    <Link href={`/channel/subscribe/${id}`} textDecoration='none '>
      <Flex pl='50px' mt='15px' alignItems={'center'} cursor={'pointer'}>
        {imgUrl ? (
          <Avatar size={'sm'} src={data?.data?.channel?.photo} mr='10px' />
        ) : (
          <Avatar
            size='sm'
            name={firstName + ' ' + lastName}
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
        >
          {data?.data?.channel?.name}
        </Text>
      </Flex>
    </Link>
  );
}

export default EachSubscribe;
