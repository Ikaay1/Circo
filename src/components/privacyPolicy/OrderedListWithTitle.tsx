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
      <Text mt='.65rem'>{description}</Text>
      <OrderedList mt='.7rem'>
        {array.map((each) => (
          <ListItem mt='.19rem' key={each}>
            <Box as='span' color='purple' fontWeight={'500'}>
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
