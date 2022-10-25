import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import SideMenu from "@components/widgets/sideMenu";

import AddMoneyModal from "@components/wallet/AddMoneyModal";
import Beneficiaries from "@components/wallet/Beneficiaries";
import BeneficiaryModal from "@components/wallet/BeneficiaryModal";
import MainWallet from "@components/wallet/MainWallet";
import { scrollBarStyle } from "@constants/utils";
import HomeLayout from "layouts/HomeLayout";
import SortModal from "@components/wallet/SortModal";
import TransactionRecieptModal from "@components/wallet/TransactionRecieptModal";
import { ReceiptInfo } from "@constants/interface";
import { useState } from "react";

type Props = {};

function Wallet({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalInfo, setModalInfo] = useState<ReceiptInfo>();

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
  const hasBeneficiary = true;

  return (
    <HomeLayout>
      <Flex>
        <SideMenu />
        <Box
          maxH={"90vh"}
          pb="50px"
          px="2"
          maxW="50%"
          overflowY={"scroll"}
          overflowX={"hidden"}
          sx={scrollBarStyle}
        >
          <MainWallet
            onClick={onOpen}
            onSort={isSortOnOpen}
            click={(info) => handleClick(info)}
          />
        </Box>
        <Box
          maxH={"90vh"}
          pb="40px"
          px="2"
          pr="5"
          maxW="50%"
          overflowY={"scroll"}
          overflowX={"hidden"}
          sx={scrollBarStyle}
        >
          <Beneficiaries
            onClick={isBeneOnOpen}
            hasBeneficiary={hasBeneficiary}
          />
        </Box>
      </Flex>
      <AddMoneyModal isOpen={isOpen} onClose={onClose} />
      <BeneficiaryModal
        isOpen={isBeneIsOpen}
        onClose={isBeneOnClose}
        type={hasBeneficiary ? "change" : "add"}
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
