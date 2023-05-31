import React from 'react';

import {
  Box,
  Button,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

const Tour = ({onClose, next}: {onClose: () => void; next: () => void}) => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Box>
      <Text fontFamily='Poppins' fontSize='smSubHead' textAlign='center'>
        <Text>Welcome to Circo!</Text> Start exploring our features and make the
        most of your experience Let’s take a quick tour to get you familiarized
        with everything. <Text>Watch out for the glowing Circo 😎</Text>
      </Text>
      <Flex px='3rem' justifyContent={'space-between'} mt='2.3rem'>
        <Button
          boxSizing='border-box'
          width='114px'
          height='40px'
          border={
            colorMode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.7)'
              : '1px solid black'
          }
          borderRadius='30px'
          fontFamily='Poppins'
          fontSize='smSubHead'
          color={useColorModeValue('clique.black', 'rgba(255, 255, 255, 0.7)')}
          bg='transparent'
          onClick={onClose}
        >
          Not now
        </Button>
        <Button
          boxSizing='border-box'
          width='114px'
          height='40px'
          borderRadius='30px'
          fontFamily='Poppins'
          fontSize='smSubHead'
          color={'clique.white'}
          bg='clique.base'
          onClick={next}
        >
          Let&apos;s go!
        </Button>
      </Flex>
    </Box>
  );
};

export default Tour;
