import React from 'react';

import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Color from '@constants/color';

function EndLiveModal({
  streamDetails,
  handleClick,
  loading,
}: {
  streamDetails: any;
  handleClick: () => void;
  loading: boolean;
}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <>
      <Button
        mt='80px'
        rounded='full'
        onClick={() => {
          onOpen();
        }}
        bg={'clique.dangerRed'}
        color={Color().blackAndWhite}
        colorScheme={'red'}
        fontFamily={'Poppins'}
      >
        End Live Stream
      </Button>
      <Modal size={'xl'} isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          px='50px'
          m='0'
          py='40px'
          rounded={'20px'}
          bg={Color().lightAndPrimary}
        >
          <Text
            color={Color().blackAndWhite}
            fontFamily={'Poppins'}
            fontWeight={400}
            fontSize={'subHead'}
            lineHeight={'1.5'}
            textAlign='center'
          >
            End live Stream
          </Text>

          <Text
            my='10px'
            color={Color().blackAndWhite}
            fontFamily={'Poppins'}
            fontWeight={400}
            fontSize={'smSubHead'}
            lineHeight={'1.5'}
            textAlign='center'
            py='20px'
          >
            Are you sure you want to end this live session?
          </Text>

          <Flex justifyContent={'space-between'}>
            <Button
              mt={'30px'}
              size='md'
              bg='none'
              w='120px'
              color={Color().blackAndWhite}
              border={'1px solid #fff'}
              onClick={onClose}
              rounded={'full'}
              fontWeight={400}
              colorScheme='whiteAlpha'
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleClick();
              }}
              mt={'30px'}
              w='120px'
              size='md'
              isLoading={loading}
              bg='clique.red'
              color={Color().blackAndWhite}
              border={'1px solid '}
              borderColor='clique.red'
              rounded={'full'}
              fontWeight={400}
              colorScheme='red'
            >
              End
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EndLiveModal;
