import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function BeneficiaryModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Beneficiary</ModalHeader>
        <ModalBody>
          Beneficailryuyyy
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default BeneficiaryModal;
