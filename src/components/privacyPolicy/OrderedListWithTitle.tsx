import React from 'react';

import {Box, ListItem, OrderedList, Text} from '@chakra-ui/react';

const OrderedListWithTitle = ({
  text,
  description,
  array,
}: {
  text: string;
  description: string;
  array: string[];
}) => {
  return (
    <Box mt='2.5rem'>
      <Text color='purple' fontWeight={'500'}>
        {text}
      </Text>
      <Text mt='.65rem' fontSize={{base: '14px', lg: '16px'}}>
        {description}
      </Text>
      <OrderedList mt='.7rem'>
        {array.map((each) => (
          <ListItem
            mt='.19rem'
            key={each}
            fontSize={{base: '14px', lg: '16px'}}
          >
            <Box as='span' color='purple' fontWeight={'500'} fontSize={'16px'}>
              {each.split(': ')[0]}:{' '}
            </Box>
            {each.split(': ')[1]}
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  );
};

export default OrderedListWithTitle;
