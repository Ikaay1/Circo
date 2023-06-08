import {Dispatch, SetStateAction, useEffect, useState} from 'react';

import {
  Box,
  Checkbox,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Color from '@constants/color';
import CalenderIcon from '@icons/CalenderIcon';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setTransactionHistory: Dispatch<SetStateAction<any[]>>;
  transactionHistory: any[];
  walletTransaction: any[];
};

function SortModal({
  isOpen,
  onClose,
  setTransactionHistory,
  transactionHistory,
  walletTransaction,
}: Props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [all, setAll] = useState(true);
  const [credit, setCredit] = useState(false);
  const [debit, setDebit] = useState(false);

  console.log('startDate', startDate);
  console.log('endDate', endDate);

  useEffect(() => {
    if (
      startDate &&
      endDate &&
      /\d\d\d\d-\d\d-\d\d/.test(startDate) === true &&
      /\d\d\d\d-\d\d-\d\d/.test(endDate) === true
    ) {
      var date2 = new Date(startDate);
      var date3 = new Date(endDate);
      console.log('start', date2);
      console.log('end', date3);
      console.log('eachDate', new Date(walletTransaction[26]?.date));
      const filteredHistory = walletTransaction?.filter(
        (each: any) =>
          new Date(each?.date).getTime() >= date2.getTime() &&
          new Date(each?.date).getTime() <= date3.getTime(),
      );
      if (all) {
        setTransactionHistory(filteredHistory);
      } else if (credit && !debit) {
        setTransactionHistory(
          filteredHistory.filter(
            (each) => each?.type === 'deposit' || each?.type === 'transferIn',
          ),
        );
      } else if (debit && !credit) {
        setTransactionHistory(
          filteredHistory.filter(
            (each) => each?.type !== 'deposit' && each?.type !== 'transferIn',
          ),
        );
      } else {
        setTransactionHistory(filteredHistory);
      }
    } else {
      if (all) {
        setTransactionHistory(walletTransaction);
      } else if (credit && !debit) {
        setTransactionHistory(
          walletTransaction.filter(
            (each) => each?.type === 'deposit' || each?.type === 'transferIn',
          ),
        );
      } else if (debit && !credit) {
        setTransactionHistory(
          walletTransaction.filter(
            (each) => each?.type !== 'deposit' && each?.type !== 'transferIn',
          ),
        );
      } else {
        setTransactionHistory(walletTransaction);
      }
    }
  }, [startDate, endDate, all, credit, debit]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent
          bg={Color().whiteAndBlack}
          borderColor={Color().whiteAndBlack}
          borderRadius='xl'
          pt='3'
          py='10'
        >
          <ModalBody>
            <Flex flexDirection={'column'}>
              <Stack
                spacing={5}
                direction={['row']}
                align='center'
                justify='center'
                mb='20'
              >
                <Box>
                  <Text
                    fontSize={'smSubHead'}
                    fontWeight='400'
                    color={'clique.secondaryGrey2'}
                    mb='0.5'
                  >
                    Start Date
                  </Text>
                  <InputGroup size='lg'>
                    <InputLeftElement pointerEvents='none'>
                      <Icon as={CalenderIcon} color='clique.white' />
                    </InputLeftElement>
                    <Input
                      onChange={(e) => setStartDate(e.target.value)}
                      type='date'
                      value={startDate}
                    />
                  </InputGroup>
                </Box>

                <Box>
                  <Text
                    fontSize={'smSubHead'}
                    fontWeight='400'
                    color={'clique.secondaryGrey2'}
                    mb='0.5'
                  >
                    End Date
                  </Text>
                  <InputGroup size='lg'>
                    <InputLeftElement pointerEvents='none'>
                      <Icon as={CalenderIcon} color='clique.white' />
                    </InputLeftElement>
                    <Input
                      onChange={(e) => setEndDate(e.target.value)}
                      value={endDate}
                      type='date'
                    />
                  </InputGroup>
                </Box>
              </Stack>
              <Stack
                spacing={24}
                direction={['row']}
                align='center'
                justify='center'
              >
                <Checkbox
                  isChecked={all}
                  onChange={(e) => setAll(e.target.checked)}
                  size='md'
                >
                  All
                </Checkbox>
                <Checkbox
                  isChecked={credit}
                  onChange={(e) => setCredit(e.target.checked)}
                  size='md'
                >
                  Credit
                </Checkbox>
                <Checkbox
                  isChecked={debit}
                  onChange={(e) => setDebit(e.target.checked)}
                  size='md'
                >
                  Debit
                </Checkbox>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SortModal;
