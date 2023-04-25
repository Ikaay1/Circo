import React from 'react';

import {Box, Divider, Flex, Text} from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box mt='5rem'>
      <Divider />
      <Divider />
      <Divider />
      <Flex
        justifyContent={'space-between'}
        mt='1rem'
        fontSize={{base: '14px', lg: '16px'}}
      >
        <Box>
          <Text>© 2023 Circo Africa</Text>
          <Text>All Rights Reserved</Text>
        </Box>
        <Text h='100%' alignSelf={'flex-end'}>
          Circo.Africa
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
