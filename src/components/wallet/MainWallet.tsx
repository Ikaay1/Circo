import { Flex } from "@chakra-ui/react";
import { ReceiptInfo } from "@constants/interface";
import TransactionHistory from "./TransactionHistory";
import WalletCard from "./WalletCard";

type Props = {
  onClick: () => void;
  click: (info: ReceiptInfo) => void;
  onSort: () => void;
};

function MainWallet({ onClick, onSort, click }: Props) {
  return (
    <Flex pt="7" flexDirection="column" gap="5">
      <WalletCard onClick={onClick} />
      <TransactionHistory onClick={onSort} click={(info) => click(info)} />
    </Flex>
  );
}

export default MainWallet;
