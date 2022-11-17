import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Icon,
  Text,
  Box,
  FormControl,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import CliqueGiftIcon from "@icons/CliqueGiftIcon";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useRoutingChannel } from "../../../custumHooks/useRoutingChannel";

function SubScribeModal({
  isOpen,
  onOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
}) {
  const { handleRouting } = useRoutingChannel();
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
          >
            Subscribe
          </Text>

          <Text
            my="10px"
            color={"clique.white"}
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={"subHead"}
            lineHeight={"1.5"}
            textAlign="center"
          >
            You are not subscribed to{" "}
            <Text as="span" color="clique.base">
              Ayra Star
            </Text>
            . Subscribe to the channel and have access to permium content,
            videos and exclusive live shows.
          </Text>

          <Flex justifyContent={"center"}>
            <Button
              mt={"30px"}
              w="70%"
              size="lg"
              bg="clique.base"
              color="clique.white"
              rounded={"full"}
              fontWeight={400}
              colorScheme="purple"
              onClick={() => handleRouting(id)}
            >
              Go to Channel
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SubScribeModal;
