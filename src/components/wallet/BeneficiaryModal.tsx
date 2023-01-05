import axios from "axios";
import { resolve } from "path";
import { useEffect, useState } from "react";
import { useGetBanksQuery } from "redux/services/bank.service";
import {
  useConfirmAccountMutation,
  useSendOTPMutation,
} from "redux/services/beneficiary.service";
import { useAddBeneficiaryMutation } from "redux/services/wallet.service";
import request from "request";

import {
  Box,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Btn from "@components/Button/Btn";
import CliqueLoader from "@components/home/CliqueLoader";
import { banks } from "@constants/utils";
import TapIcon from "@icons/TapIcon";
import Color from "@constants/color";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  type: "add" | "change";
  refetch: any;
  beneficiary: any;
};

function BeneficiaryModal({
  isOpen,
  onClose,
  type,
  refetch,
  beneficiary,
}: Props) {
  const toast = useToast();
  const { data, isFetching } = useGetBanksQuery("");
  const [loading, setLoading] = useState(false);
  const [sendOTP] = useSendOTPMutation();
  const [addBeneficiary, addBeneficiaryStatus] = useAddBeneficiaryMutation();
  const [beneficiaryData, setBeneficiaryData] = useState({
    otp_hash: "",
    otp_code: "",
    password: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
  });
  const [confirmAccount, confirmAccountStatus] = useConfirmAccountMutation();
  const [loading2, setLoading2] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const confirm = async () => {
      setLoading2(true);
      confirmAccount({
        accountNumber: beneficiaryData.accountNumber.trim(),
        code: beneficiaryData.bankName.trim().split("#")[1],
      }).then((data: any) => {
        if (data?.data?.data?.status === "success") {
          setBeneficiaryData((prevBeneficiaryData) => ({
            ...prevBeneficiaryData,
            accountName: data?.data?.data?.data?.account_name,
          }));
          setLoading2(false);
        } else {
          toast({
            title: "Account not found",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          setBeneficiaryData((prevBeneficiaryData) => ({
            ...prevBeneficiaryData,
            accountName: "",
          }));
          setLoading2(false);
        }
      });
    };
    if (
      beneficiaryData.accountNumber.length === 10 &&
      beneficiaryData.bankName
    ) {
      confirm();
    }
  }, [
    beneficiaryData.accountNumber,
    confirmAccount,
    beneficiaryData.bankName,
    toast,
  ]);

  useEffect(() => {
    if (type === "change") {
      setBeneficiaryData((prevData) => ({
        ...prevData,
        bankName: `${beneficiary.bankName}#${beneficiary?.code}`,
        accountName: beneficiary.accountName,
        accountNumber: beneficiary.accountNumber,
      }));
    }
  }, [
    type,
    beneficiary.bankName,
    beneficiary.accountName,
    beneficiary.accountNumber,
    beneficiary?.code,
  ]);

  const handleSendOTP = async () => {
    setLoading(true);
    sendOTP({}).then((res) => {
      if ("data" in res) {
        toast({
          title: "Otp sent successfully. Please check your email",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setBeneficiaryData((prevData) => ({
          ...prevData,
          otp_hash: res.data?.data?.otp_hash,
        }));
        setDisabled(true);
        setShow(true);
        setLoading(false);
        setTimeout(() => {
          setDisabled(false);
          setShow(false);
        }, 20000);
      } else {
        setLoading(false);
      }
    });
  };

  const handleChange = (e: any) => {
    setBeneficiaryData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateBeneficiary = async () => {
    if (!beneficiaryData.otp_hash) {
      toast({
        title: "Please tap the button to receive an OTP",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      if (
        !beneficiaryData.bankName ||
        !beneficiaryData.accountName ||
        !beneficiaryData.accountNumber ||
        !beneficiaryData.otp_code ||
        !beneficiaryData.password
      ) {
        toast({
          title: "Please fill every field",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        const res: any = await addBeneficiary({
          bankName: beneficiaryData.bankName.split("#")[0],
          accountName: beneficiaryData.accountName,
          accountNumber: beneficiaryData.accountNumber,
          otp_code: beneficiaryData.otp_code,
          otp_hash: beneficiaryData.otp_hash,
          password: beneficiaryData.password,
          code: beneficiaryData.bankName.split("#")[1],
        });
        if ("data" in res) {
          setBeneficiaryData({
            otp_hash: "",
            otp_code: "",
            password: "",
            bankName: "",
            accountName: "",
            accountNumber: "",
          });
          onClose();
          refetch();
        } else if (res.error) {
          toast({
            title: res.error?.data?.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        } else {
          toast({
            title: "Something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg={Color().whiteAndBlack}
        borderColor={Color().whiteAndBlack}
        borderRadius="xl"
        pt="3"
        pb="4"
        w={{ base: "100%" }}
      >
        <ModalHeader alignSelf="center" fontSize={"subHead"}>
          {type === "add" ? "Add" : "Change"} Beneficiary
        </ModalHeader>
        <ModalBody>
          <Flex flexDirection={"column"}>
            <Btn
              size="lg"
              py="12"
              borderRadius="16px"
              leftIcon={<Icon as={TapIcon} color="white" />}
              text="Tap to receive OTP in your mail"
              fontSize={"smSubHead"}
              isLoading={loading}
              disabled={disabled}
              onClick={handleSendOTP}
            />
            {show && (
              <Text fontSize="smSubHead" my="1rem" mb=".5rem">
                You will be able to request for another OTP after 20 seconds
              </Text>
            )}

            <Box
              bg="clique.secondaryGrey1"
              px="2"
              pt="1"
              borderRadius={"10px"}
              width="full"
              mb="4"
              mt="4"
            >
              <Text
                fontSize={"smSubHead"}
                fontWeight="400"
                color={"clique.secondaryGrey2"}
              >
                Select Bank
              </Text>
              <Select
                bg="clique.secondaryGrey1"
                size="sm"
                border="none"
                placeholder="Select Bank"
                name="bankName"
                required={true}
                value={beneficiaryData.bankName}
                onChange={(e) => handleChange(e)}
                outline="none"
              >
                {data?.data?.data?.map((bank: any) => (
                  <option value={`${bank.name}#${bank.code}`} key={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </Select>
            </Box>

            <Box
              bg="clique.secondaryGrey1"
              px="2"
              pt="1"
              borderRadius={"10px"}
              width="full"
              mb="4"
            >
              <Text
                fontSize={"smSubHead"}
                fontWeight="400"
                color={"clique.secondaryGrey2"}
              >
                Account number
              </Text>
              <Input
                name="accountNumber"
                variant="filled"
                size="sm"
                bg="clique.secondaryGrey1"
                required={true}
                value={beneficiaryData.accountNumber}
                onChange={(e) => handleChange(e)}
                outline="none"
                border="none"
              />
            </Box>

            <Box
              bg="clique.secondaryGrey1"
              px="2"
              pt="1"
              borderRadius={"10px"}
              width="full"
              mb="4"
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box width="90%">
                <Text
                  fontSize={"smSubHead"}
                  fontWeight="400"
                  color={"clique.secondaryGrey2"}
                >
                  Account Name
                </Text>
                <Input
                  name="accountName"
                  variant="filled"
                  size="sm"
                  bg="clique.secondaryGrey1"
                  required={true}
                  value={beneficiaryData.accountName}
                  readOnly={true}
                  width="100%"
                  outline="none"
                  border="none"
                />
              </Box>
              {loading2 && (
                <Box display="flex" alignItems={"center"}>
                  <Spinner />
                </Box>
              )}
            </Box>

            <Box
              bg="clique.secondaryGrey1"
              px="2"
              pt="1"
              borderRadius={"10px"}
              width="full"
              mb="4"
            >
              <Text
                fontSize={"smSubHead"}
                fontWeight="400"
                color={"clique.secondaryGrey2"}
              >
                OTP
              </Text>
              <Input
                variant="filled"
                name="otp_code"
                size="sm"
                bg="clique.secondaryGrey1"
                required={true}
                value={beneficiaryData.otp_code}
                onChange={(e) => handleChange(e)}
                outline="none"
                border="none"
              />
            </Box>
            <Box
              bg="clique.secondaryGrey1"
              px="2"
              pt="1"
              borderRadius={"10px"}
              width="full"
              mb="4"
            >
              <Text
                fontSize={"smSubHead"}
                fontWeight="400"
                color={"clique.secondaryGrey2"}
              >
                Password
              </Text>
              <Input
                variant="filled"
                size="sm"
                bg="clique.secondaryGrey1"
                type="password"
                name="password"
                required={true}
                value={beneficiaryData.password}
                onChange={(e) => handleChange(e)}
                outline="none"
                border="none"
              />
            </Box>
            <Box px="7">
              <Btn
                text={type === "add" ? "Add beneficiary" : "Change beneficiary"}
                style={{ width: "100%" }}
                onClick={handleCreateBeneficiary}
                isLoading={addBeneficiaryStatus.isLoading}
              ></Btn>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default BeneficiaryModal;
