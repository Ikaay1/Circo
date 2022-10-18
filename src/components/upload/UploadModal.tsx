import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import UploadIcon from "@icons/UploadIcon";
import React, { ChangeEvent, useRef } from "react";
import { MdAddCircleOutline } from "react-icons/md";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleChoose: () => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: HTMLInputElement | any;
};

function UploadModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {};
  const [source, setSource] = React.useState<File | undefined>();
  const [download, setDownload] = React.useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | any>();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    setSource(file);
    onClose();
    setDownload(true);
  };

  const handleChoose = () => {
    inputRef.current.click();
  };

  let base;
  return (
    <>
      <Button
        rightIcon={<Icon fontSize={"lg"} as={MdAddCircleOutline} />}
        variant="ghost"
        rounded={"full"}
        bg="clique.base"
        fontFamily={"Poppins"}
        size={"sm"}
        onClick={onOpen}
      >
        Upload
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg="clique.black"
          borderColor="clique.black"
          borderRadius="xl"
        >
          <ModalBody>
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
    </>
  );
}

export default UploadModal;
