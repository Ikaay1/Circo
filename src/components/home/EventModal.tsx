import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import EventsCard from "./EventsCard";

function EventModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <EventsCard onOpen={onOpen} />

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent
          maxW="250px"
          w="250px"
          bottom="0"
          m="0"
          position={"absolute"}
          right={0}
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EventModal;
