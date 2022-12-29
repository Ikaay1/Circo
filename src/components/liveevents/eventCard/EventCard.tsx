import moment from 'moment';
import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

function EventCard({onOpen, event}: {onOpen: () => void; event: any}) {
  return (
    <Flex
      minW={{base: 'full', lg: '220px', mlg: '280px', xl: 'full'}}
      rounded={'10px'}
      alignItems='flex-end'
      h={{base: '200px', lg: '180px', mlg: '200px'}}
      bg='clique.lightGrey'
      bgImage={`url(${event?.eventId?.thumbNails[0]})`}
      bgSize={'cover'}
      bgPosition={'center'}
      onClick={() => {
        onOpen();
      }}
      cursor={'pointer'}
    >
      <Box
        bg='clique.blurColor'
        roundedBottom={'10px'}
        backdropFilter=' blur(10px)'
        px='20px'
        py='10px'
        w='full'
        h={'55px'}
      >
        <Text
          noOfLines={1}
          color={'clique.white'}
          fontFamily={'Poppins'}
          fontWeight={500}
          fontSize={'smSubHead'}
          lineHeight={'1.2'}
          mr='5px'
        >
          {event?.eventId?.title}
        </Text>
        <Text
          noOfLines={2}
          color={'clique.white'}
          fontFamily={'Poppins'}
          fontWeight={500}
          fontSize={'smSubHead'}
          lineHeight={'1.2'}
          mt='5px'
        >
          {moment(
            event?.eventId?.schedule === undefined
              ? event?.eventId?.schedule
              : event?.eventId?.schedule === ''
              ? Date.now()
              : event?.eventId?.schedule,
          ).format('MMM DD . h:mm A')}
        </Text>
      </Box>
    </Flex>
  );
}

export default EventCard;
