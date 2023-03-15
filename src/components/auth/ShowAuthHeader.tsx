import React from 'react';

import {Box, Text} from '@chakra-ui/react';
import Color from '@constants/color';

export const ShowAuthHeader = ({
  header,
  detail,
}: {
  header: string;
  detail: string;
}) => {
  return (
    <Box>
      <Text
        fontWeight='600'
        fontSize='medium'
        textAlign='center'
        letterSpacing='-0.02em'
        color={Color().blackAndWhite2}
      >
        {header}
      </Text>
      <Text color='clique.secondaryGrey2' textAlign='center'>
        {detail}
      </Text>
    </Box>
  );
};

export default ShowAuthHeader;
