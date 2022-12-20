import {
	Box,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Skeleton,
	SkeletonText,
	Text,
} from '@chakra-ui/react';
import Btn from '@components/Button/Btn';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  buttonText: string;
  header: string;
  description: string;
  onClick: () => void;
  isLoading: boolean;
  //   name: string;
};

function Sure({
  isOpen,
  onClose,
  buttonText,
  header,
  description,
  onClick,
  isLoading,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
      <ModalOverlay />
      <ModalContent
        bg='clique.black'
        borderColor='clique.black'
        borderRadius='xl'
        pt='3'
        pb='10'
      >
        <ModalHeader alignSelf='center' mb='2' fontSize={'smHead'}>
          {header}
        </ModalHeader>

        <ModalBody>
          <Flex flexDirection={'column'}>
            <Text
              fontSize={'subHead'}
              fontWeight='400'
              mb='4rem'
              textAlign={'center'}
              noOfLines={3}
              color='clique.white'
            >
              {description}
            </Text>

            <Flex justifyContent={'space-between'}>
              <Btn
                text='Cancel'
                style={{width: '200px'}}
                py='6'
                bg='transparent'
                border='1px solid white'
                onClick={onClose}
              ></Btn>
              <Btn
                text={buttonText}
                style={{width: '200px'}}
                py='6'
                bg='clique.secondaryRed'
                onClick={onClick}
                isLoading={isLoading}
              ></Btn>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Sure;
