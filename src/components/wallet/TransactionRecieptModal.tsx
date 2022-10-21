import {
  Flex,
  Icon, Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text
} from "@chakra-ui/react";
import UpwardIcon from "@icons/UpwardIcon";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function TransactionRecieptModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"md"}>
      <ModalOverlay />
      <ModalContent
        bg="clique.black"
        borderColor="clique.black"
        borderRadius="xl"
        pt="3"
        pb="5"
        px="1"
      >
        <ModalHeader alignSelf="center" fontSize={"subHead"}>
          Transaction Receipt
        </ModalHeader>

        <ModalBody>
          <Flex
            flexDirection={"column"}
            pb="20"
            px="2"
            pt="3"
            borderRadius={"xl"}
            backgroundSize={"cover"}
            backgroundImage="'/assets/transactionbg.svg'"
          >
            <Flex
              justifyContent={"space-between"}
              align="center"
              justify="center"
              mb="12"
            >
              <Spacer />
              <Icon as={UpwardIcon} fontSize="5xl" />
              <Spacer />
              <Text fontSize={"xsl"} fontWeight="400" color={"clique.white"}>
                8 hour
              </Text>
            </Flex>
            <Flex justifyContent={"space-between"} mb="2">
              <Text
                fontWeight="400"
                color={"clique.secondaryGrey2"}
                fontSize="xsl"
              >
                From
              </Text>

              <Text
                fontSize={"smSubHead"}
                fontWeight="400"
                color={"clique.white"}
              >
                Emmanuel Edward
              </Text>
            </Flex>
            <Flex justifyContent={"space-between"} mb="2">
              <Text
                fontSize={"smSubHead"}
                fontWeight="400"
                color={"clique.secondaryGrey2"}
              >
                Description
              </Text>
              <Text
                fontSize={"smSubHead"}
                fontWeight="400"
                color={"clique.white"}
              >
                Subscription to TheDoreenTube
              </Text>
            </Flex>
            <Flex justifyContent={"space-between"} mb="2">
              <Text
                fontSize={"smSubHead"}
                fontWeight="400"
                color={"clique.secondaryGrey2"}
              >
                Date
              </Text>
              <Text
                fontSize={"smSubHead"}
                fontWeight="400"
                color={"clique.white"}
              >
                8/19/2022
              </Text>
            </Flex>
            <Flex justifyContent={"space-between"}>
              <Text
                fontSize={"smSubHead"}
                fontWeight="400"
                color={"clique.secondaryGrey2"}
              >
                Reference
              </Text>
              <Text
                fontSize={"smSubHead"}
                fontWeight="400"
                color={"clique.white"}
              >
                7EB8ENEE0J8E0EHEE0
              </Text>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TransactionRecieptModal;
