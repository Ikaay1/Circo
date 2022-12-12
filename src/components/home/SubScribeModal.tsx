import { Field, Form, Formik } from 'formik';
import React from 'react';

import {
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	Icon,
	Modal,
	ModalContent,
	ModalOverlay,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import CliqueGiftIcon from '@icons/CliqueGiftIcon';

import { useRoutingChannel } from '../../hooks/useRoutingChannel';

function SubScribeModal({
  isOpen,
  onOpen,
  onClose,
  id,
  userName,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  userName: string;
}) {
  const {handleRouting} = useRoutingChannel();

  return (
    <>
      <Modal size={'2xl'} isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent m='0' p='40px' rounded={'20px'} bg='clique.primaryBg'>
          <Text
            color={'clique.white'}
            fontFamily={'Poppins'}
            fontWeight={400}
            fontSize={'head'}
            lineHeight={'1.5'}
            textAlign='center'
          >
            Subscribe
          </Text>

          <Text
            my='10px'
            color={'clique.white'}
            fontFamily={'Poppins'}
            fontWeight={400}
            fontSize={'subHead'}
            lineHeight={'1.5'}
            textAlign='center'
          >
            You are not subscribed to
            <Text as='span' color='clique.base'>
              {" " +userName}
            </Text>
            . Subscribe to the channel and have access to permium content,
            videos and exclusive live shows.
          </Text>

          <Flex justifyContent={'center'}>
            <Button
              mt={'30px'}
              w='70%'
              size='lg'
              bg='clique.base'
              color='clique.white'
              rounded={'full'}
              fontWeight={400}
              colorScheme='purple'
              onClick={() => handleRouting(id)}
            >
              Go to Channel
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SubScribeModal;
