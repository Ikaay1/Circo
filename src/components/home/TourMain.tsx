import React from 'react';

import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Color from '@constants/color';
import ArrowTour from '@icons/ArrowTour';

const TourMain = ({
  back,
  next,
  isOpen,
  text,
  header,
  number,
}: {
  back: () => void;
  isOpen: boolean;
  next: () => void;
  text: string;
  header: string;
  number: string;
}) => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => {}} isCentered>
        <ModalOverlay />
        <Icon
          display={{base: 'none', mdlg: 'block', mlg: 'none'}}
          as={ArrowTour}
          position={'fixed'}
          top={
            number === '1'
              ? 'calc(8vh)'
              : number === '2'
              ? 'calc(10vh + 31px)'
              : number === '3'
              ? 'calc(10vh + 167px)'
              : number === '4'
              ? 'calc(10vh + 304px)'
              : '5vh'
          }
          left={
            number === '5'
              ? '21%'
              : number === '6'
              ? 'calc(100vw - 447px)'
              : number === '7'
              ? 'calc(100vw - 392px)'
              : number === '8'
              ? 'calc(100vw - 320px)'
              : number === '9'
              ? 'calc(100vw - 210px)'
              : '180px'
          }
          width='70px'
          height='118px'
          className='tourArrow'
          transform={
            // header.toLowerCase() === 'profile' ||
            header.toLowerCase() === 'home' ||
            header.toLowerCase() === 'discover' ||
            header.toLowerCase() === 'wallet' ||
            header.toLowerCase() === 'settings'
              ? 'rotate(-90deg)'
              : undefined
          }
          // border='1px solid red'
        />
        <ModalContent
          bg={Color().whiteAndBlack}
          borderColor={Color().whiteAndBlack}
          borderRadius='xl'
          pt='3'
          pb='4'
          w={{base: '100%'}}
        >
          <ModalHeader alignSelf='center' fontSize={'smHead'} fontWeight='500'>
            {header}
            <Text
              fontFamily='Poppins'
              fontSize={'smSubHead'}
              textAlign='center'
              fontWeight={'400'}
            >
              {`${number} of 9`}
            </Text>
          </ModalHeader>
          <ModalBody>
            <Box>
              <Text
                fontFamily='Poppins'
                fontSize='smSubHead'
                textAlign='center'
              >
                {text}
              </Text>
              <Flex px='3rem' justifyContent={'space-between'} mt='2.3rem'>
                {number === '1' ? (
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
                    color={
                      colorMode === 'dark'
                        ? 'rgba(255, 255, 255, 0.7)'
                        : 'clique.black'
                    }
                    bg='transparent'
                    onClick={back}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    boxSizing='border-box'
                    width='114px'
                    height='40px'
                    borderRadius='30px'
                    fontFamily='Poppins'
                    fontSize='smSubHead'
                    color={'clique.white'}
                    bg='clique.base'
                    onClick={back}
                  >
                    Back
                  </Button>
                )}
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
                  {number === '9' ? 'Explore!' : 'Next'}
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TourMain;
