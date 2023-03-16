import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppSelector } from "redux/app/hooks";
import { useFlutterwavePaymentMutation } from "redux/services/bank.service";
import { useGetUserQuery } from "redux/services/user.service";
import {
  useConfirmDepositMutation,
  useDepositToWalletMutation,
} from "redux/services/wallet.service";
import React from "react";

import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SkeletonCircle,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Btn from "@components/Button/Btn";
import Color from "@constants/color";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

function AddMoneyModal({ isOpen, onClose, refetch }: Props) {
  const [confirmDeposit, statusInfo] = useConfirmDepositMutation();
  const chakraToast = useToast();
  const [amount, setAmount] = useState<string | number>("");
  const [amountFocused, setAmountFocused] = useState(false);

  const user = useAppSelector((state) => state.app.userReducer.userProfile);
  const config: any = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_KEY,
    amount: amount,
    tx_ref: user?._id + Math.floor(Math.random() * 1000000000) + 1 + Date.now(),
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user?.email,
    },
  };
  const initialRef = React.useRef(null);

  const handleFlutterPayment = useFlutterwave(config);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleDeposit = async (response: any) => {
    const res: any = await confirmDeposit({
      amount: Number(amount),
      transactionId: response?.transaction_id,
      currency: response?.currency,
      tx_ref: response?.tx_ref,
    });

    console.log(res);

    if ("data" in res) {
      setAmount("");
      refetch();
    } else {
      chakraToast({
        title: res?.error?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
    setIsPaying(false);
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent
        bg={Color().whiteAndBlack}
        borderColor={Color().whiteAndBlack}
        borderRadius="xl"
        pt="3"
        pb="10"
        w={{ base: "100%" }}
        ref={initialRef}
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
              <Box width="full" height="60px" position="relative">
                <FormControl isInvalid={error}>
                  <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input"
                    type={"number"}
                    required={true}
                    placeholder="Amount"
                    backgroundColor={Color().greyAndWhite}
                    _placeholder={{
                      color: Color().blackAndWhite,

                      fontSize: amountFocused || amount !== "" ? "sm3" : "1rem",
                      pb: amountFocused || amount !== "" ? "5px" : "0",
                      transition: "all .3s ease",
                      transform:
                        amountFocused || amount !== ""
                          ? "translateY(-110%);  "
                          : "translateY(0%); ",
                    }}
                    h="60px"
                    borderWidth={"1px"}
                    borderColor={Color().greyAndWhite}
                    _focus={{
                      boxShadow: "none",
                      border: "none",
                      outline: "none",
                    }}
                    _active={{
                      boxShadow: "none",
                      border: "none",
                      outline: "none",
                    }}
                    color={Color().blackAndWhite}
                    onFocus={() => {
                      setAmountFocused(true);
                      if (error) {
                        setError(null);
                      }
                    }}
                    // onBlur={() => {
                    //   setAmountFocused(false);
                    //   if (amount === "") {
                    //     setError("Amount is required");
                    //   }
                    // }}
                  />

                  <Text
                    position="absolute"
                    top="0%"
                    left={"4.5%"}
                    fontSize="sm3"
                    pt="5px"
                    color={Color().blackAndWhite}
                    display={amount !== "" ? "block" : "none"}
                    transition="all .3s ease"
                    zIndex="99"
                  >
                    Amount
                  </Text>
                  {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </FormControl>
              </Box>
            </Box>
            <Box px="7">
              <Btn
                text="Add money to wallet"
                style={{ width: "100%" }}
                isLoading={isPaying || statusInfo.isLoading}
                onClick={() => {
                  if (!amount) {
                    setError("Amount is required");
                    return;
                  }
                  setIsPaying(true);
                  handleFlutterPayment({
                    callback: (response) => {
                      handleDeposit(response);

                      closePaymentModal();
                    },
                    onClose: () => {
                      setIsPaying(false);
                    },
                  });
                }}
              ></Btn>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddMoneyModal;
