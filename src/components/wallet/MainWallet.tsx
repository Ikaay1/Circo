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
};

function MainWallet({onClick, onSort, click}: Props) {
  const {data, isFetching} = useGetUserWalletQuery('');
  console.log(data);

  return (
    <Flex
      pt='7'
      flexDirection='column'
      gap='5'
      w='100%'
      h={isFetching || !data ? '100%' : ''}
    >
      {isFetching || !data ? (
        <Box w='100%' h='100%'>
          <CliqueLoader />
        </Box>
      ) : (
        <>
          <WalletCard walletData={data?.data} onClick={onClick} />
          <TransactionHistory
            walletData={data?.data}
            onClick={onSort}
            click={(info) => click(info)}
          />
        </>
      )}
    </Flex>
  );
}

export default MainWallet;
