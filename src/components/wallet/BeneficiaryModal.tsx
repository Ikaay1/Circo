import {
  Box, Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text
} from "@chakra-ui/react";
import Btn from "@components/Button/Btn";
import TapIcon from "@icons/TapIcon";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  type: "add" | "change";
};

function BeneficiaryModal({ isOpen, onClose, type }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="clique.black"
        borderColor="clique.black"
        borderRadius="xl"
        pt="3"
        pb="4"
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
              text="Tap to receieve OTP in your mail"
              fontSize={"smSubHead"}
            />

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
              <Select bg="clique.secondaryGrey1" size="sm" border="none" />
            </Box>

            {type === "add" && (
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
                  Account Name
                </Text>
                <Input variant="filled" size="sm" bg="clique.secondaryGrey1" />
              </Box>
            )}

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
              <Input variant="filled" size="sm" bg="clique.secondaryGrey1" />
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
              <Input variant="filled" size="sm" bg="clique.secondaryGrey1" />
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
              />
            </Box>
            <Box px="7">
              <Btn
                text={type === "add" ? "Add beneficiary" : "Change beneficiary"}
                style={{ width: "100%" }}
              ></Btn>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default BeneficiaryModal;
