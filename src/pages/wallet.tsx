import HomeLayout from 'layouts/HomeLayout';
import {useEffect, useState} from 'react';
import {useFlutterwavePaymentMutation} from 'redux/services/bank.service';
import {useGetUserWalletQuery} from 'redux/services/wallet.service';

import {Box, Flex, useDisclosure} from '@chakra-ui/react';
import CliqueLoader from '@components/home/CliqueLoader';
import AddMoneyModal from '@components/wallet/AddMoneyModal';
import Beneficiaries from '@components/wallet/Beneficiaries';
import BeneficiaryModal from '@components/wallet/BeneficiaryModal';
import MainWallet from '@components/wallet/MainWallet';
import SortModal from '@components/wallet/SortModal';
import TransactionRecieptModal from '@components/wallet/TransactionRecieptModal';
import SideMenu from '@components/widgets/sideMenu';
import {ReceiptInfo} from '@constants/interface';
import {scrollBarStyle, scrollBarStyle3} from '@constants/utils';

type Props = {};

function Wallet({}: Props) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [modalInfo, setModalInfo] = useState<ReceiptInfo>();
  const {data, isFetching, refetch, isError} = useGetUserWalletQuery('');
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);

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
    // isReceiptOnOpen();
  };

  useEffect(() => {
    if (data) {
      setTransactionHistory(data?.data?.transaction_history);
    }
  }, [data]);

  return (
    <HomeLayout>
      <Flex flexDirection={{base: 'column', lg: 'row'}}>
        <SideMenu />
        {isFetching || !data ? (
          <Box h='90vh' marginX='auto'>
            <CliqueLoader />
          </Box>
        ) : (
          <>
            <Box
              maxH={'90vh'}
              pb={{base: '20px', lg: '50px'}}
              px={'2'}
              pl={{xl: '100px'}}
              w={{base: '100%', lg: '62%'}}
              overflowY={'scroll'}
              overflowX={'hidden'}
              sx={scrollBarStyle3}
            >
              <MainWallet
                onClick={onOpen}
                onSort={isSortOnOpen}
                click={(info) => handleClick(info)}
                walletData={data?.data}
                transactionHistory={transactionHistory}
              />
            </Box>
            <Box
              maxH={'90vh'}
              pb='40px'
              px='2'
              pr={{xl: '100px'}}
              w={{base: '100%', lg: '38%'}}
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
                info={modalInfo as ReceiptInfo}
              />
            </Box>
          </>
        )}
      </Flex>

      <AddMoneyModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
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
      <SortModal
        setTransactionHistory={setTransactionHistory}
        transactionHistory={transactionHistory}
        walletTransaction={data?.data?.transaction_history}
        isOpen={isSortIsOpen}
        onClose={isSortOnClose}
      />
      <TransactionRecieptModal
        isOpen={isReceiptIsOpen}
        onClose={isReceiptOnClose}
        info={modalInfo as ReceiptInfo}
      />
    </HomeLayout>
  );
}

export default Wallet;
export {getServerSideProps} from '../components/widgets/Chakara';
