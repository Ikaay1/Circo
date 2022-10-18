import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import UploadIcon from "@icons/UploadIcon";
import React, { ChangeEvent, useRef } from "react";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleChoose: () => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: HTMLInputElement | any;
};

function UploadModal({
  isOpen,
  onClose,
  onOpen,
  handleChoose,
  handleFileChange,
  inputRef,
}: Props) {
  const handleClick = () => {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent  bg="clique.black" borderColor="clique.black" borderRadius="xl">
        <ModalBody
       
        >
          <Flex
            align="center"
            justify="center"
            direction="column"
            pt="100px"
            pb="100px"
          >
            <Icon as={UploadIcon} fontSize="70px" />
            <Text
              textAlign={"center"}
              fontFamily={"Poppins"}
              fontWeight={500}
              fontSize="20px"
              mb="14"
              mt="14"
            >
              Drag and drop file to uplaod
            </Text>
            <Button bg="clique.tertiary" onClick={handleChoose} px="7">
              Select file
            </Button>
            <input
              ref={inputRef}
              type="file"
              onChange={handleFileChange}
              accept=".mp4"
              style={{
                display: "none",
              }}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UploadModal;
