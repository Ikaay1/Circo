import {useRouter} from 'next/router';
import React, {ChangeEvent, useRef} from 'react';
import Dropzone from 'react-dropzone';
import {MdAddCircleOutline} from 'react-icons/md';
import {useAppDispatch} from 'redux/app/hooks';
import {setSources} from 'redux/slices/uploadSlice';

import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Color from '@constants/color';
import UploadIcon from '@icons/UploadIcon';

function UploadModal() {
  const toast = useToast();
  const [isDragging, setIsDragging] = React.useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const inputRef = useRef<HTMLInputElement | any>();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]?.type.includes('video')) {
      toast({
        title: 'Please select a video',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setIsDragging(false);
      return;
    }
    if (event.target.files[0]?.size / 1024 > 71680) {
      toast({
        title: 'Please select a video less than or equal to 70mb',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setIsDragging(false);
      return;
    }
    const file = event.target.files[0];
    const name = file?.name;
    const url = URL?.createObjectURL(file);
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
        color='clique.white'
        rightIcon={<Icon fontSize={'lg'} as={MdAddCircleOutline} />}
        variant='ghost'
        rounded={'full'}
        bg='clique.base'
        fontFamily={'Poppins'}
        size={'sm'}
        onClick={onOpen}
      >
        Upload
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='clique.modalOverlay' />
        <ModalContent
          bg={'clique.black'}
          borderColor={Color().whiteAndBlack}
          borderRadius='xl'
        >
          <ModalBody>
            <Flex
              pt='100px'
              align='center'
              justify='center'
              direction='column'
              pb='100px'
            >
              <Dropzone
                onDragEnter={() => {
                  setIsDragging(true);
                }}
                onDragLeave={() => {
                  setIsDragging(false);
                }}
                onDragOver={() => {
                  setIsDragging(true);
                }}
                onDrop={(acceptedFiles) => {
                  if (!acceptedFiles[0]?.type.includes('video')) {
                    toast({
                      title: 'Please select a video',
                      status: 'error',
                      duration: 3000,
                      isClosable: true,
                      position: 'top-right',
                    });
                    setIsDragging(false);
                    return;
                  }
                  if (acceptedFiles[0]?.size / 1024 > 71680) {
                    toast({
                      title: 'Please select a video less than or equal to 70mb',
                      status: 'error',
                      duration: 3000,
                      isClosable: true,
                      position: 'top-right',
                    });
                    setIsDragging(false);
                    return;
                  }
                  const file = acceptedFiles[0];
                  const name = file?.name;
                  const url = URL?.createObjectURL(file);
                  onClose();
                  dispatch(setSources({url, name}));
                  router.push('/upload');
                }}
              >
                {({getRootProps, getInputProps}) => (
                  <section>
                    <Flex
                      p='20px'
                      border={isDragging ? '2px dashed #fff' : 'none'}
                      align='center'
                      justify='center'
                      direction='column'
                      {...getRootProps()}
                      mb='14'
                    >
                      <input {...getInputProps()} />
                      <Icon as={UploadIcon} fontSize='70px' />
                      <Text
                        textAlign={'center'}
                        fontFamily={'Poppins'}
                        fontWeight={500}
                        fontSize='smHead'
                        mt='14'
                        color={'clique.white'}
                      >
                        {isDragging
                          ? 'Drop the file here'
                          : '  Drag and drop file to upload'}
                      </Text>
                    </Flex>
                  </section>
                )}
              </Dropzone>

              <Button bg='clique.tertiary' onClick={handleChoose} px='7'>
                Select file
              </Button>
              <input
                ref={inputRef}
                type='file'
                onChange={handleFileChange}
                accept='.mp4'
                style={{
                  display: 'none',
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
