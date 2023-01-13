import { useGetUserWalletQuery } from 'redux/services/wallet.service';

import { Box, Flex } from '@chakra-ui/react';
import CliqueLoader from '@components/home/CliqueLoader';
import { ReceiptInfo } from '@constants/interface';

import TransactionHistory from './TransactionHistory';
import WalletCard from './WalletCard';

type Props = {
  onClick: () => void;
  click: (info: ReceiptInfo) => void;
  onSort: () => void;
  walletData: any;
  flutterwaveStatus: {
    isLoading: boolean;
  };
  transactionHistory: any[];
};

function MainWallet({
  onClick,
  onSort,
  click,
  walletData,
  flutterwaveStatus,
  transactionHistory,
}: Props) {
  return (
    <Flex pt='7' flexDirection='column' gap='5' w='100%'>
      <>
        <WalletCard
          walletData={walletData}
          onClick={onClick}
          flutterwaveStatus={flutterwaveStatus}
        />
        <TransactionHistory
          walletData={walletData}
          onClick={onSort}
          click={(info) => click(info)}
          transactionHistory={transactionHistory}
        />
      </>
    </Flex>
  );
}

export default MainWallet;
