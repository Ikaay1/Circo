import { ChangeEvent, useRef, useState } from 'react';
import { useCreatePlaylistMutation } from 'redux/services/playlist.service';

import { Box, Button, Icon, Image, Text, useToast } from '@chakra-ui/react';
import TextArea from '@components/channel/TextArea';
import UploadPlaylistIcon from '@icons/UploadPlaylistIcon';

const NewPlaylist = ({onClose}: {onClose: any}) => {
  const [uImage, setUImage] = useState<any>();
  const [url, setUrl] = useState('');
  const [nameValue, setNameValue] = useState('');
  const toast = useToast();
  const [createPlaylist, createPlaylistStatus] = useCreatePlaylistMutation();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const image = event.target.files[0];
    const newUrl = URL?.createObjectURL(image);
    setUrl(newUrl);
    setUImage(image);
  };

  const handleChooseProfile = () => {
    coverRef.current.click();
  };
  const coverRef = useRef<HTMLInputElement | any>();

  const onSubmit = async () => {
    if (!coverRef.current.files[0]) {
      toast({
        title: 'Please upload a thumbNail',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
    if (!nameValue) {
      toast({
        title: 'Please input a Playlist Name',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
    const myFormData = new FormData();
    myFormData.append('name', nameValue);
    coverRef.current.files[0] &&
      myFormData.append('cover', coverRef.current.files[0]);
    const res: any = await createPlaylist(myFormData);
    if ('data' in res) {
      toast({
        title: 'Playlist created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setNameValue('');
      setUrl('');
      onClose();
    } else if (res.error) {
      toast({
        title: res.error.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      toast({
        title: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <Box p='1rem'>
        <Box>
          <Text
            fontWeight='500'
            fontSize='smHead2'
            lineHeight='36px'
            letterSpacing='-0.02em'
            color='clique.white'
            textAlign={'center'}
            mb='1rem'
          >
            New Playlist
          </Text>
          {url ? (
            <>
              <Image
                src={url}
                alt='cover photo'
                height='341px'
                width='100%'
                objectFit='cover'
                zIndex={'-1'}
                borderRadius='10px'
              />
              <Box
                position={'absolute'}
                top='50%'
                left={'50%'}
                transform='translate(-50%, -50%)'
                onClick={handleChooseProfile}
              >
                <Box cursor={'pointer'}>
                  <Icon as={UploadPlaylistIcon} />
                </Box>
              </Box>
            </>
          ) : (
            <Box
              width='100%'
              height='341px'
              background='clique.blackGrey'
              borderRadius='10px'
              position='relative'
            >
              <Box
                position={'absolute'}
                top='50%'
                left={'50%'}
                transform='translate(-50%, -50%)'
                onClick={handleChooseProfile}
              >
                <Box cursor={'pointer'}>
                  <Icon as={UploadPlaylistIcon} />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Box mt='1.1rem'>
          <Text
            fontWeight='500'
            fontSize='smHead2'
            lineHeight='36px'
            letterSpacing='-0.02em'
            color='clique.secondaryGrey2'
            textAlign={'center'}
          >
            Playlist Name
          </Text>
          <Box mt='1rem'>
            <TextArea
              color='clique.white'
              placeholder='Playlist name'
              width='100%'
              height='195px'
              background='#232323'
              borderRadius='10px'
              paddingLeft='1.4rem'
              paddingTop='0.9rem'
              outline='none'
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNameValue(event.target.value)
              }
              value={nameValue}
            />
          </Box>
        </Box>

        <Button
          background='clique.purple'
          borderRadius='50px'
          fontWeight='500'
          fontSize={{base: 'sm2', lg: 'smHead'}}
          lineHeight='36px'
          display='flex'
          alignItems='center'
          justifyContent={'center'}
          letterSpacing='-0.02em'
          color='clique.white'
          w='100%'
          h='65px'
          mt='1.5rem'
          onClick={onSubmit}
          cursor='pointer'
          isLoading={createPlaylistStatus.isLoading}
        >
          Create new Playlist
        </Button>
      </Box>
      <input
        ref={coverRef}
        type='file'
        accept='image/png, image/jpeg'
        onChange={(event) => handleFileChange(event)}
        name='profile'
        style={{
          display: 'none',
        }}
      />
    </>
  );
};

export default NewPlaylist;
