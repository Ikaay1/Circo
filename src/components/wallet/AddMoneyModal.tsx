import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppSelector } from "redux/app/hooks";
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
} from "@chakra-ui/react";
import Btn from "@components/Button/Btn";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  amount: number | string;
  setAmount: Dispatch<SetStateAction<number | string>>;
  refetch: () => void;
};

function AddMoneyModal({ isOpen, onClose, amount, setAmount, refetch }: Props) {
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  const [depositToWallet, depositToWalletStatus] = useDepositToWalletMutation();
  const router = useRouter();
  const { data, isFetching } = useGetUserQuery(userProfile?._id);
  const config: any = {
    public_key: process.env.NEXT_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: data?.data?.email,
      name: data?.data?.firstName + " " + data?.data?.lastName,
    },
    customizations: {
      title: "Deposit to wallet",
      description: "Deposit to my wallet",
      logo: "https://clique-web.vercel.app/assets/clique-logo.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    if (!amount) {
      setAmount("");
    }
  }, [amount, setAmount]);

  useEffect(() => {
    if (!userProfile?._id) {
      router.push("/login");
    }
  }, [router, userProfile]);

  const handleDeposit = () => {
    if (!amount) {
      toast.error("Please input an Amount");
      return;
    }
    if (data?.data?.email) {
      handleFlutterPayment({
        callback: async (response) => {
          const res: any = await depositToWallet({
            amount: Number(response.amount),
            description: "Funding wallet",
            reference: `${response.tx_ref}`,
          });
          if ("data" in res) {
            refetch();
          }
          if ("error" in res) {
            console.log(res?.error);
            //   toast.error(
            //     res?.error?.data?.message
            //       ? res?.error?.data?.message
            //       : "Something went wrong, couldn't make deposit",
            //   );
          }
          closePaymentModal(); // this will close the modal programmatically
          setAmount("");
        },
        onClose: () => {
          setAmount("");
        },
      });
      // onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="clique.black"
        borderColor="clique.black"
        borderRadius="xl"
        pt="3"
        pb="10"
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
              {!data?.data?.email || isFetching ? (
                <SkeletonCircle mx="auto" w="150px" h="50px" />
              ) : (
                <Btn
                  text="Add money to wallet"
                  style={{ width: "100%" }}
                  isLoading={depositToWalletStatus.isLoading}
                  onClick={handleDeposit}
                ></Btn>
              )}
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddMoneyModal;
