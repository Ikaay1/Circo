import {
  Button, Flex, Modal, ModalContent, ModalOverlay, Text
} from "@chakra-ui/react";
import Btn from "@components/Button/Btn";
import { useRouter } from "next/router";
function CreateChannelModal({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const router = useRouter();

  return (
    <>
      <Modal size={"2xl"} isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent m="0" p="40px" rounded={"20px"} bg="clique.primaryBg">
          <Text
            color={"clique.white"}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"head"}
            lineHeight={"1.5"}
            textAlign="center"
            mb="30"
          >
            Create your channel
          </Text>

          <Text
            my="30"
            color={"clique.white"}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"subHead"}
            lineHeight={"1.5"}
            textAlign="center"
          >
            You do not have a channel. Will you like to create a channel and
            become a creator on Clique?
          </Text>

          <Flex justifyContent={"space-between"} mt="30">
            <Button
              px="16"
              py="6"
              variant="outline"
              borderRadius={"50px"}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Btn
              text="Create"
              px="16"
              py="6"
              onClick={() => router.push("/channel/create")}
            />
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateChannelModal;
