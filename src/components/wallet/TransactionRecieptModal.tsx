import {
	Flex,
	Icon,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Spacer,
	Text,
} from '@chakra-ui/react';
import { ReceiptInfo } from '@constants/interface';
import DownwardIcon from '@icons/DownwardIcon';
import UpwardIcon from '@icons/UpwardIcon';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  info: ReceiptInfo;
};

function TransactionRecieptModal({isOpen, onClose, info}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'md'}>
      <ModalContent
        bg='clique.black'
        borderColor='clique.black'
        borderRadius='xl'
        pt='3'
        pb='5'
        px='1'
      >
        <ModalHeader alignSelf='center' fontSize={'subHead'}>
          Transaction Receipt
        </ModalHeader>

        <ModalBody>
          <Flex
            flexDirection={'column'}
            pb='20'
            px='2'
            pt='3'
            borderRadius={'xl'}
            backgroundSize={'cover'}
            backgroundImage="'/assets/transactionbg.svg'"
          >
            <Flex
              justifyContent={'space-between'}
              align='center'
              justify='center'
              mb='12'
            >
              <Spacer />
              <Icon
                as={info?.from === 'To' ? DownwardIcon : UpwardIcon}
                fontSize='5xl'
              />
              <Spacer />
              <Text fontSize={'xsl'} fontWeight='400' color={'clique.white'}>
                {info?.duration}
              </Text>
            </Flex>
            <Flex justifyContent={'space-between'} mb='2'>
              <Text
                fontWeight='400'
                color={'clique.secondaryGrey2'}
                fontSize='xsl'
              >
                {info?.from}
                
              </Text>

              <Text
                fontSize={'smSubHead'}
                fontWeight='400'
                color={'clique.white'}
              >
                {info?.name}
              </Text>
            </Flex>
            <Flex justifyContent={'space-between'} mb='2'>
              <Text
                fontSize={'smSubHead'}
                fontWeight='400'
                color={'clique.secondaryGrey2'}
              >
                Description
              </Text>
              <Text
                fontSize={'smSubHead'}
                fontWeight='400'
                color={'clique.white'}
                textAlign={'right'}
              >
                {info?.description}
              </Text>
            </Flex>
            <Flex justifyContent={'space-between'} mb='2'>
              <Text
                fontSize={'smSubHead'}
                fontWeight='400'
                color={'clique.secondaryGrey2'}
              >
                Date
              </Text>
              <Text
                fontSize={'smSubHead'}
                fontWeight='400'
                color={'clique.white'}
              >
                {info?.date}
              </Text>
            </Flex>
            <Flex justifyContent={'space-between'}>
              <Text
                fontSize={'smSubHead'}
                fontWeight='400'
                color={'clique.secondaryGrey2'}
              >
                Reference
              </Text>
              <Text
                fontSize={'smSubHead'}
                fontWeight='400'
                color={'clique.white'}
              >
                {info?.reference}
              </Text>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TransactionRecieptModal;
