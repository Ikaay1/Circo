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

function UnsubscribeModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={true} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="clique.black"
        borderColor="clique.black"
        borderRadius="xl"
        pt="3"
        pb="10"
      >
        <ModalHeader alignSelf="center" mb="7" fontSize={"smHead"}>
          Unsubscribe
        </ModalHeader>

        <ModalBody>
          <Flex flexDirection={"column"}>
            <Text
              fontSize={"smSubHead"}
              fontWeight="400"
              mb="12"
              textAlign={"center"}
            >
              You are about to unsubscribe to
              <Text color="red" display="inline">
                Ayra Star
              </Text>
              . Unsubscribing to the channel removes your access to permium
              content, videos and exclusive live shows.
            </Text>
            <Box px="7">
              <Btn
                text="Unsubscribe"
                style={{ width: "100%" }}
                py="6"
                bg="secondaryRed"
              ></Btn>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UnsubscribeModal;
