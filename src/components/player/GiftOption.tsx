import React from 'react';

import {Box, Flex, Image, Text} from '@chakra-ui/react';

function GiftOption({props, id, title, price, icon}: any) {
  return (
    <Flex
      alignItems={'center'}
      mt='10px'
      onClick={() => {
        props.setFieldValue('selected', price);
      }}
      cursor={'pointer'}
      bg='clique.blackGrey'
      p='10px'
    >
      <CustomCheckBox
        isChecked={price === props.values.selected ? true : false}
      />

      <Image mx='20px' py='5px' w='30px' src={icon} alt='svg for gift types' />
      <Text fontFamily={'Poppins'} color='clique.white'>
        {title}
        <Text as='span' color='clique.text'>
          (₦{price})
        </Text>
      </Text>
    </Flex>
  );
}

export default GiftOption;

function CustomCheckBox({isChecked}: any) {
  return (
    <Flex
      border={'1px solid'}
      borderColor='clique.base'
      rounded={'full'}
      p='2px'
      w='18px'
      h='18px'
      align={'center'}
      justify={'center'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Box
        w='10px'
        h='10px'
        maxW={'10px'}
        maxH={'10px'}
        minW={'10px'}
        minH={'10px'}
        bg={isChecked ? 'clique.base' : 'none'}
        rounded={'full'}
      ></Box>
    </Flex>
  );
}
