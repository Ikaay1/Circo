import HomeLayout from 'layouts/HomeLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/app/hooks';
import { useFlutterwavePaymentMutation } from 'redux/services/bank.service';
import { useGetUserWalletQuery } from 'redux/services/wallet.service';

import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import CliqueLoader from '@components/home/CliqueLoader';
import AddMoneyModal from '@components/wallet/AddMoneyModal';
import Beneficiaries from '@components/wallet/Beneficiaries';
import BeneficiaryModal from '@components/wallet/BeneficiaryModal';
import MainWallet from '@components/wallet/MainWallet';
import SortModal from '@components/wallet/SortModal';
import TransactionRecieptModal from '@components/wallet/TransactionRecieptModal';
import SideMenu from '@components/widgets/sideMenu';
import { ReceiptInfo } from '@constants/interface';
import { scrollBarStyle } from '@constants/utils';

type Props = {};

function Wallet({}: Props) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [modalInfo, setModalInfo] = useState<ReceiptInfo>();
  const {data, isFetching, refetch, isError} = useGetUserWalletQuery('');
  const [amount, setAmount] = useState<string | number>('');
  const {userProfile, token} = useAppSelector((store) => store.app.userReducer);
  const router = useRouter();
  const [flutterwave, flutterwaveStatus] = useFlutterwavePaymentMutation();

  useEffect(() => {
    if (!userProfile?._id) {
      router.push('/login');
    }
  }, [userProfile?._id, router]);

  const {
    isOpen: isBeneIsOpen,
    onOpen: isBeneOnOpen,
    onClose: isBeneOnClose,
  } = useDisclosure();

  const {
    isOpen: isSortIsOpen,
    onOpen: isSortOnOpen,
    onClose: isSortOnClose,
  } = useDisclosure();

  const {
    isOpen: isReceiptIsOpen,
    onOpen: isReceiptOnOpen,
    onClose: isReceiptOnClose,
  } = useDisclosure();

  const handleClick = (info: ReceiptInfo) => {
    setModalInfo(info);
    isReceiptOnOpen();
  };

  return (
    <HomeLayout>
      <Flex>
        <SideMenu />
        {isFetching || !data ? (
          <Box w='100%' h='90vh'>
            <CliqueLoader />
          </Box>
        ) : (
          <>
            <Box
              maxH={'90vh'}
              pb='50px'
              px={'2'}
              pl={{xl: '100px'}}
              w='62%'
              overflowY={'scroll'}
              overflowX={'hidden'}
              sx={scrollBarStyle}
            >
              <MainWallet
                onClick={onOpen}
                onSort={isSortOnOpen}
                click={(info) => handleClick(info)}
                walletData={data?.data}
                flutterwaveStatus={flutterwaveStatus}
              />
            </Box>
            <Box
              maxH={'90vh'}
              pb='40px'
              px='2'
              pr={{xl: '100px'}}
              w='38%'
              overflowY={'scroll'}
              overflowX={'hidden'}
              sx={scrollBarStyle}
            >
              <Beneficiaries
                onClick={isBeneOnOpen}
                hasBeneficiary={
                  data?.data?.beneficiary?.accountNumber ? true : false
                }
                walletData={data?.data}
              />
            </Box>
          </>
        )}
      </Flex>

      <AddMoneyModal
        isOpen={isOpen}
        onClose={onClose}
        amount={amount}
        setAmount={setAmount}
        refetch={refetch}
        flutterwave={flutterwave}
        flutterwaveStatus={flutterwaveStatus}
      />
      <BeneficiaryModal
        isOpen={isBeneIsOpen}
        onClose={isBeneOnClose}
        type={data?.data?.beneficiary?.accountNumber ? 'change' : 'add'}
        refetch={refetch}
        beneficiary={
          data?.data?.beneficiary?.accountNumber ? data?.data?.beneficiary : ''
        }
      />
      <SortModal isOpen={isSortIsOpen} onClose={isSortOnClose} />
      <TransactionRecieptModal
        isOpen={isReceiptIsOpen}
        onClose={isReceiptOnClose}
        info={modalInfo as ReceiptInfo}
      />
    </HomeLayout>
  );
}

export default Wallet;
