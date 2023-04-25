import React from 'react';

import {
  Box,
  Flex,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import Subscriptions from '@components/profile/Subscriptions';
import {scrollBarStyle3} from '@constants/utils';
import GoTo from '@icons/GoTo';

const SeeMore = ({allData}: {allData: {data: {user: any[]}}}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <>
      <Flex
        // justifyContent={'space-between'}
        my='1.5rem'
        // w='145px'
        pl='50px'
        mx='auto'
        onClick={onOpen}
        cursor={'pointer'}
        alignItems={'center'}
      >
        <Text
          fontFamily='Poppins'
          fontStyle='normal'
          fontWeight='400'
          fontSize='15px'
          lineHeight='24px'
          letterSpacing='0.5px'
          mr='1rem'
        >
          See more ({allData?.data?.user?.length - 4})
        </Text>
        <Icon
          as={GoTo}
          color={useColorModeValue('clique.black', 'clique.white')}
        />
      </Flex>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInRight'
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent
          maxW='400px'
          w='400px'
          bottom='0'
          minH='100vh'
          overflowY={'scroll'}
          sx={scrollBarStyle3}
          m='0'
          py='30px'
          position={'absolute'}
          right={0}
          bg={useColorModeValue('clique.white', 'clique.black')}
        >
          <Subscriptions />
        </ModalContent>
      </Modal>
    </>
  );
};

export default SeeMore;
