import React from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import SideMenu from "@components/widgets/sideMenu";

import HomeLayout from "layouts/HomeLayout";
import Beneficiaries from "@components/wallet/Beneficiaries";
import MainWallet from "@components/wallet/MainWallet";
import { scrollBarStyle } from "@constants/utils";
import AddMoneyModal from "@components/wallet/AddMoneyModal";
import BeneficiaryModal from "@components/wallet/BeneficiaryModal";

type Props = {};

function Wallet({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isBeneIsOpen,
    onOpen: isBeneOnOpen,
    onClose: isBeneOnClose,
  } = useDisclosure();

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
          <MainWallet onClick={onOpen} />
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
          <Beneficiaries onClick={isBeneOnOpen} />
        </Box>
      </Flex>
      <AddMoneyModal isOpen={isOpen} onClose={onClose} />
      <BeneficiaryModal isOpen={isBeneIsOpen} onClose={isBeneOnClose} />
    </HomeLayout>
  );
}

export default Wallet;
