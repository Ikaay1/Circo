import {
  Box,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import Btn from "@components/Button/Btn";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  isLoading: boolean;
  name: string;
};

function UnsubscribeModal({
  isOpen,
  onClose,
  onClick,
  isLoading,
  name,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent
        bg="clique.black"
        borderColor="clique.black"
        borderRadius="xl"
        pt="3"
        pb="10"
      >
        <ModalHeader alignSelf="center" mb="2" fontSize={"smHead"}>
          Unsubscribe
        </ModalHeader>

        <ModalBody>
          <Flex flexDirection={"column"}>
            {isLoading ? (
              <SkeletonText mb="20" noOfLines={3} spacing="4" height={"20px"} />
            ) : (
              <Text
                fontSize={"subHead"}
                fontWeight="400"
                mb="12"
                textAlign={"center"}
                noOfLines={3}
              >
                You are about to unsubscribe to
                <Text color="clique.base" display="inline">
                  {" " + name + " "}
                </Text>
                . Unsubscribing to the channel removes your access to permium
                content, videos and exclusive live shows.
              </Text>
            )}

            <Box px="20">
              <Btn
                text="Unsubscribe"
                style={{ width: "100%" }}
                py="6"
                bg="clique.secondaryRed"
                onClick={onClick}
              ></Btn>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UnsubscribeModal;
