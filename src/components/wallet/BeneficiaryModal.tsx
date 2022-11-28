import { useEffect, useState } from 'react';
import { useGetBanksQuery } from 'redux/services/bank.service';
import {
	useAddBeneficiaryMutation,
	useSendOTPMutation,
} from 'redux/services/wallet.service';

import {
	Box,
	Flex,
	Icon,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Select,
	Text,
	useToast,
} from '@chakra-ui/react';
import Btn from '@components/Button/Btn';
import TapIcon from '@icons/TapIcon';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  type: 'add' | 'change';
  refetch: any;
  beneficiary: any;
};

function BeneficiaryModal({
  isOpen,
  onClose,
  type,
  refetch,
  beneficiary,
}: Props) {
  const toast = useToast();
  const {data, isFetching} = useGetBanksQuery('');
  const [sendOTP] = useSendOTPMutation();
  const [addBeneficiary, addBeneficiaryStatus] = useAddBeneficiaryMutation();
  const [beneficiaryData, setBeneficiaryData] = useState({
    otp_hash: '',
    otp_code: '',
    password: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
  });

  useEffect(() => {
    if (type === 'change') {
      setBeneficiaryData((prevData) => ({
        ...prevData,
        bankName: beneficiary.bankName,
        accountName: beneficiary.accountName,
        accountNumber: beneficiary.accountNumber,
      }));
    }
  }, [
    type,
    beneficiary.bankName,
    beneficiary.accountName,
    beneficiary.accountNumber,
  ]);

  const handleSendOTP = async () => {
    const res: any = await sendOTP({});
    if ('data' in res) {
      toast({
        title: 'Otp sent successfully. Please check your email',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      setBeneficiaryData((prevData) => ({
        ...prevData,
        otp_hash: res.data?.data?.otp_hash,
      }));
    }
  };

  const handleChange = (e: any) => {
    setBeneficiaryData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateBeneficiary = async () => {
    if (!beneficiaryData.otp_hash) {
      toast({
        title: 'Please tap the button to receive an OTP',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } else {
      if (
        !beneficiaryData.bankName ||
        !beneficiaryData.accountName ||
        !beneficiaryData.accountNumber ||
        !beneficiaryData.otp_code ||
        !beneficiaryData.password
      ) {
        toast({
          title: 'Please fill every field',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      } else {
        await addBeneficiary({
          bankName: beneficiaryData.bankName,
          accountName: beneficiaryData.accountName,
          accountNumber: beneficiaryData.accountNumber,
          otp_code: beneficiaryData.otp_code,
          otp_hash: beneficiaryData.otp_hash,
          password: beneficiaryData.password,
        });
        setBeneficiaryData({
          otp_hash: '',
          otp_code: '',
          password: '',
          bankName: '',
          accountName: '',
          accountNumber: '',
        });
        onClose();
        refetch();
      }
    }
  };

  console.log(beneficiaryData);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg='clique.black'
        borderColor='clique.black'
        borderRadius='xl'
        pt='3'
        pb='4'
      >
        <ModalHeader alignSelf='center' fontSize={'subHead'}>
          {type === 'add' ? 'Add' : 'Change'} Beneficiary
        </ModalHeader>
        <ModalBody>
          <Flex flexDirection={'column'}>
            <Btn
              size='lg'
              py='12'
              borderRadius='16px'
              leftIcon={<Icon as={TapIcon} color='white' />}
              text='Tap to receieve OTP in your mail'
              fontSize={'smSubHead'}
              onClick={handleSendOTP}
            />

            <Box
              bg='clique.secondaryGrey1'
              px='2'
              pt='1'
              borderRadius={'10px'}
              width='full'
              mb='4'
              mt='4'
            >
              <Text
                fontSize={'smSubHead'}
                fontWeight='400'
                color={'clique.secondaryGrey2'}
              >
                Select Bank
              </Text>
              <Select
                bg='clique.secondaryGrey1'
                size='sm'
                border='none'
                placeholder='Select Bank'
                name='bankName'
                required={true}
                value={beneficiaryData.bankName}
                onChange={(e) => handleChange(e)}
              >
                {data?.data.map((bank: any) => (
                  <option value={bank.name} key={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </Select>
            </Box>

            <Box
              bg='clique.secondaryGrey1'
              px='2'
              pt='1'
              borderRadius={'10px'}
              width='full'
              mb='4'
            >
              <Text
                fontSize={'smSubHead'}
                fontWeight='400'
                color={'clique.secondaryGrey2'}
              >
                Account Name
              </Text>
              <Input
                name='accountName'
                variant='filled'
                size='sm'
                bg='clique.secondaryGrey1'
                required={true}
                value={beneficiaryData.accountName}
                onChange={(e) => handleChange(e)}
              />
            </Box>

            <Box
              bg='clique.secondaryGrey1'
              px='2'
              pt='1'
              borderRadius={'10px'}
              width='full'
              mb='4'
            >
              <Text
                fontSize={'smSubHead'}
                fontWeight='400'
                color={'clique.secondaryGrey2'}
              >
                Account number
              </Text>
              <Input
                name='accountNumber'
                variant='filled'
                size='sm'
                bg='clique.secondaryGrey1'
                required={true}
                value={beneficiaryData.accountNumber}
                onChange={(e) => handleChange(e)}
              />
            </Box>
            <Box
              bg='clique.secondaryGrey1'
              px='2'
              pt='1'
              borderRadius={'10px'}
              width='full'
              mb='4'
            >
              <Text
                fontSize={'smSubHead'}
                fontWeight='400'
                color={'clique.secondaryGrey2'}
              >
                OTP
              </Text>
              <Input
                variant='filled'
                name='otp_code'
                size='sm'
                bg='clique.secondaryGrey1'
                required={true}
                value={beneficiaryData.otp_code}
                onChange={(e) => handleChange(e)}
              />
            </Box>
            <Box
              bg='clique.secondaryGrey1'
              px='2'
              pt='1'
              borderRadius={'10px'}
              width='full'
              mb='4'
            >
              <Text
                fontSize={'smSubHead'}
                fontWeight='400'
                color={'clique.secondaryGrey2'}
              >
                Password
              </Text>
              <Input
                variant='filled'
                size='sm'
                bg='clique.secondaryGrey1'
                type='password'
                name='password'
                required={true}
                value={beneficiaryData.password}
                onChange={(e) => handleChange(e)}
              />
            </Box>
            <Box px='7'>
              <Btn
                text={type === 'add' ? 'Add beneficiary' : 'Change beneficiary'}
                style={{width: '100%'}}
                onClick={handleCreateBeneficiary}
                isLoading={addBeneficiaryStatus.isLoading}
              ></Btn>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default BeneficiaryModal;
