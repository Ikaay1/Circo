import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppSelector } from "redux/app/hooks";
import { useFlutterwavePaymentMutation } from "redux/services/bank.service";
import { useGetUserQuery } from "redux/services/user.service";
import { useDepositToWalletMutation } from "redux/services/wallet.service";

import {
  Box,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Btn from "@components/Button/Btn";
import Color from "@constants/color";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  amount: number | string;
  setAmount: Dispatch<SetStateAction<number | string>>;
  refetch: () => void;
  flutterwave: any;
  flutterwaveStatus: {
    isLoading: boolean;
  };
};

function AddMoneyModal({
  isOpen,
  onClose,
  amount,
  setAmount,
  refetch,
  flutterwave,
  flutterwaveStatus,
}: Props) {
  const { token } = useAppSelector((store) => store.app.userReducer);
  const router = useRouter();

  useEffect(() => {
    if (!amount) {
      setAmount("");
    }
  }, [amount, setAmount]);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

  const handleDeposit = async () => {
    if (!amount) {
      toast.error("Please input an Amount");
      return;
    }
    onClose();
    const res: any = await flutterwave({ amount: Number(amount) });

    if ("data" in res) {
      setAmount("");

      localStorage.setItem("okay", JSON.stringify(amount));
      window.open(res.data?.data?.data?.link);
    }
    // handleFlutterPayment({
    //   callback: async (response) => {
    //     const res: any = await depositToWallet({
    //       amount: Number(response.amount),
    //       description: 'Funding wallet',
    //       reference: `${response.tx_ref}`,
    //     });
    //     if ('data' in res) {
    //       refetch();
    //     }
    //     if ('error' in res) {
    //
    //       //   toast.error(
    //       //     res?.error?.data?.message
    //       //       ? res?.error?.data?.message
    //       //       : "Something went wrong, couldn't make deposit",
    //       //   );
    //     }
    //     closePaymentModal(); // this will close the modal programmatically
    //     setAmount('');
    //   },
    //   onClose: () => {},
    // });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg={Color().whiteAndBlack}
        borderColor={Color().whiteAndBlack}
        borderRadius="xl"
        pt="3"
        pb="10"
        w={{ base: "100%" }}
      >
        <ModalHeader alignSelf="center" mb="7" fontSize={"subHead"}>
          How much will you like to Add?
        </ModalHeader>

        <ModalBody>
          <Flex flexDirection={"column"}>
            <Box
              bg="clique.secondaryGrey1"
              px="2"
              py="1"
              borderRadius={"10px"}
              width="full"
              mb="10"
            >
              <Text
                fontSize={"smSubHead"}
                fontWeight="400"
                color={"clique.secondaryGrey2"}
              >
                Amount
              </Text>
              <Input
                variant="filled"
                type={"number"}
                size="sm"
                bg="clique.secondaryGrey1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </Box>
            <Box px="7">
              <Btn
                text="Add money to wallet"
                style={{ width: "100%" }}
                isLoading={flutterwaveStatus.isLoading}
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
