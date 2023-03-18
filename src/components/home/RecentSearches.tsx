import React from 'react';

import {Box, Flex, Icon, Text} from '@chakra-ui/react';
import CloseIcon from '@icons/CloseIcon';

const RecentSearches = () => {
  return (
    <Box mt='1rem'>
      {['Ayra Star', 'Burna Boy'].map((each) => (
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          mt='.7rem'
          key={each}
        >
          <Text
            background='clique.blackGrey'
            borderRadius='30px'
            fontFamily="'Poppins'"
            fontStyle='normal'
            lineHeight='20px'
            color='#FFFFFF'
            py='.4rem'
            px='.8rem'
          >
            {each}
          </Text>
          <Icon as={CloseIcon} w='24px' h='24px' cursor='pointer' />
        </Flex>
      ))}
    </Box>
  );
};

export default RecentSearches;
