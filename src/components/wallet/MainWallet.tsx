import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import WalletCard from "./WalletCard";
import TransactionHistory from "./TransactionHistory";

type Props = {
  onClick: () => void;
  onSort: () => void;
};

function MainWallet({ onClick, onSort }: Props) {
  return (
    <Flex pt="7" flexDirection="column" gap="5">
      <WalletCard onClick={onClick} />
      <TransactionHistory onClick={onSort} />
    </Flex>
  );
}

export default MainWallet;
