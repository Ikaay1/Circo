import { useRouter } from 'next/router';
import React, { ChangeEvent, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { MdAddCircleOutline } from 'react-icons/md';
import { useAppDispatch } from 'redux/app/hooks';
import { setSources } from 'redux/slices/uploadSlice';

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
} from '@chakra-ui/react';
import UploadIcon from '@icons/UploadIcon';

function UploadModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const inputRef = useRef<HTMLInputElement | any>();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]?.type.includes('video')) {
      toast.error('Please select a video');
      return;
    }
    const file = event.target.files[0];
    const name = file?.name;
    const url = URL?.createObjectURL(file);
    // console.log(file);
    // console.log();
    onClose();
    dispatch(setSources({url, name}));
    router.push('/upload');
  };
  const handleChoose = () => {
    inputRef.current.click();
  };

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
        <ModalOverlay bg="clique.modalOverlay" />
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
                fontSize="smHead"
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
