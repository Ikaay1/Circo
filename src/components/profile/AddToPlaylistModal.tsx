import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from 'redux/app/hooks';
import {
	useAddVideoMutation,
	useGetPlaylistQuery,
} from 'redux/services/playlist.service';
import { useGetUserQuery } from 'redux/services/user.service';

import {
	Avatar,
	Box,
	Flex,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Skeleton,
	SkeletonCircle,
	Text,
	useToast,
	WrapItem,
} from '@chakra-ui/react';
import Btn from '@components/Button/Btn';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
};

const AddToPlaylistModal = ({isOpen, onClose, videoId}: Props) => {
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const {data, isLoading, isFetching} = useGetPlaylistQuery(userProfile?._id);
  const [addVideo] = useAddVideoMutation();
  const toast = useToast();
  const router = useRouter();

  const handleAdd = async (id: string) => {
    const res: any = await addVideo({
      videoId,
      playlistId: id,
    });
    if ('data' in res) {
      toast({
        title: 'Video successfully added',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    } else if (res.error) {
      toast({
        title: 'Video already in playlist',
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
      <ModalOverlay />
      <ModalContent
        bg='clique.darkGrey1'
        borderColor='clique.darkGrey1'
        borderRadius='xl'
        pt='3'
        pb='10'
        w={{base: '100%'}}
      >
        <ModalHeader alignSelf='center' fontSize={'subHead'}>
          Add to Playlist
        </ModalHeader>

        <ModalBody>
          <Flex flexDirection={'column'}>
            <Box mb='4'>
              <Text mb='2' color='clique.secondaryGrey2' fontSize={'subHead'}>
                Recent
              </Text>

              <Flex
                cursor={'pointer'}
                onClick={() => handleAdd(data?.data?.playlists[0]?._id)}
              >
                <Image
                  src={data?.data?.playlists[0]?.cover}
                  alt='playlist cover'
                  objectFit={'cover'}
                  h='80px'
                  w='80px'
                  borderRadius='10px'
                />
                <Text alignSelf={'end'} ml='7' color={'clique.white'}>
                  {data?.data?.playlists[0]?.name}
                </Text>
              </Flex>
            </Box>

            <Text mb='2' color='clique.secondaryGrey2' fontSize={'subHead'}>
              All Playlist
            </Text>
            {data?.data?.playlists?.map((each: any) => {
              return (
                <Flex
                  cursor={'pointer'}
                  key={each._id}
                  mb='2'
                  onClick={() => handleAdd(each?._id)}
                >
                  <Image
                    src={each.cover}
                    alt='playlist cover'
                    objectFit={'cover'}
                    h='80px'
                    w='80px'
                    borderRadius='10px'
                  />
                  <Text
                    alignSelf={'end'}
                    ml='7'
                    fontSize={'subHead'}
                    color='clique.white'
                  >
                    {each.name}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddToPlaylistModal;
