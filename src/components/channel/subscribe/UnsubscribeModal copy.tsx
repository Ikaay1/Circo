import {
  Box,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Btn from "@components/Button/Btn";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function AddMoneyModal({ isOpen, onClose }: Props) {
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
          Unsubscribe
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
                Your subscription to Ayra Star will expire in 14 days, after
                which you’ll be unsubscribed to the channel.
              </Text>
              <Input variant="filled" size="sm" bg="clique.secondaryGrey1" />
            </Box>
            <Box px="7">
              <Btn text="Done" style={{ width: "100%" }}></Btn>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddMoneyModal;
