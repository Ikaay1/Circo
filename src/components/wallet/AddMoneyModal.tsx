import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppSelector } from 'redux/app/hooks';

import {
	Box,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';
import Btn from '@components/Button/Btn';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function AddMoneyModal({isOpen, onClose}: Props) {
  // const router = useRouter();
  const [amount, setAmount] = useState<string | number>('');
  const {userProfile, token} = useAppSelector((store) => store.app.userReducer);

  useEffect(() => {
    if (!amount) {
      setAmount('');
    }
  }, [amount]);

  const handleDeposit = () => {
    if (!amount) {
      toast.error('Please input an Amount');
      return;
    }
    if (userProfile._id) {
      // router.push(`/deposit?id=${userProfile._id}&amount=${amount}`);
      window.location.replace(
        `https://clique-payment.netlify.app?id=${userProfile._id}&amount=${amount}&token=${token}`,
      );
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg='clique.black'
        borderColor='clique.black'
        borderRadius='xl'
        pt='3'
        pb='10'
      >
        <ModalHeader alignSelf='center' mb='7' fontSize={'subHead'}>
          How much will you like to Add?
        </ModalHeader>

        <ModalBody>
          <Flex flexDirection={'column'}>
            <Box
              bg='clique.secondaryGrey1'
              px='2'
              py='1'
              borderRadius={'10px'}
              width='full'
              mb='10'
            >
              <Text
                fontSize={'smSubHead'}
                fontWeight='400'
                color={'clique.secondaryGrey2'}
              >
                Amount
              </Text>
              <Input
                variant='filled'
                type={'number'}
                size='sm'
                bg='clique.secondaryGrey1'
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </Box>
            <Box px='7'>
              <Btn
                text='Add money to wallet'
                style={{width: '100%'}}
                onClick={handleDeposit}
              ></Btn>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddMoneyModal;
