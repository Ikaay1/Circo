import React from 'react';

import {Box, Text} from '@chakra-ui/react';

const IntroductionFormat = ({
  text,
  description,
  mt,
  email,
}: {
  text: string;
  description: string;
  mt?: string;
  email?: string;
}) => {
  return (
    <Box mt={mt ? mt : '1rem'}>
      <Text color='purple' fontWeight={'500'}>
        {text}
      </Text>
      <Text mt='.65rem' fontSize={{base: '14px', lg: '16px'}}>
        {description}
        {email && (
          <Box as='span' color='purple' fontWeight={'500'} cursor='pointer'>
            <a href={`mailto: ${email}`}>{email}.</a>
          </Box>
        )}
      </Text>
    </Box>
  );
};

export default IntroductionFormat;
