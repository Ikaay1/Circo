import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useAppSelector} from 'redux/app/hooks';
import {useRemoveVideoMutation} from 'redux/services/playlist.service';

import {
  Box,
  Flex,
  Icon,
  Image,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Sure from '@components/channel/Sure';
import TrashIconRed from '@icons/TrashIconRed';

import MoreIcon from '../../assets/icons/MoreIcon';
import {Playlist, Videos} from './PlaylistDetails';

type Props = {
  item: Videos;
  i: number;
  playlist: Playlist;
  videoId: string;
};
const PlaylistList = ({item, i, playlist, videoId}: Props) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [deleteVideo, deleteVideoStatus] = useRemoveVideoMutation();
  const toast = useToast();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleDelete = async (playlistId: string, videoId: string) => {
    setShow(false);
    await deleteVideo({playlistId, videoId});
    toast({
      title: 'Video removed from playlist successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
    onClose();
  };

  return (
    <>
      {
        <Box
          display={'flex'}
          justifyContent='space-between'
          alignItems={'center'}
          mt={i !== 0 ? '1.4rem' : '0em'}
          key={item?.video?._id}
          position='relative'
        >
          <Box display={'flex'} alignItems={'center'}>
            <Box mr={'1rem'}>
              {item?.video?.thumbNail ? (
                <Image
                  src={item?.video.thumbNail}
                  w='75px'
                  h='75px'
                  objectFit={'cover'}
                  borderRadius='10px'
                  alt='video thumbNail'
                  cursor='pointer'
                  onClick={() =>
                    router.push(
                      `/player/${item?.video?._id}/${item?.video?.uploader_id}`,
                    )
                  }
                />
              ) : (
                <Flex
                  w='75px'
                  h='75px'
                  borderRadius='10px'
                  bg='linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), #232323'
                  cursor='pointer'
                  onClick={() =>
                    router.push(
                      `/player/${item?.video?._id}/${item?.video?.uploader_id}`,
                    )
                  }
                ></Flex>
              )}
            </Box>
            <Box>
              <Text
                fontWeight='500'
                fontSize='smSubHead'
                lineHeight='28px'
                // color='clique.white'
                mb='.5rem'
                cursor='pointer'
                onClick={() =>
                  router.push(
                    `/player/${item?.video?._id}/${item?.video?.uploader_id}`,
                  )
                }
              >
                {item?.video?.title}
              </Text>
              <Text
                fontSize='sm'
                lineHeight='24px'
                color='clique.secondaryGrey2'
              >
                {item?.video?.channel_id?.name}
              </Text>
            </Box>
          </Box>
          {show ? (
            <Box
              position={'absolute'}
              bottom='0'
              right='0.5'
              bg='clique.secondaryGrey2'
              p='3'
              borderTopLeftRadius={15}
              borderBottomRightRadius={'10px'}
              pl='1'
              sx={{
                transition: 'all 3s ease-in-out',
              }}
              onMouseLeave={() => setShow(false)}
            >
              <Flex
                align='center'
                justifyItems={'center'}
                mb='2'
                key={i}
                cursor='pointer'
                onClick={onOpen}
              >
                <Icon
                  as={videoSideMenu.icon}
                  fontSize='15px'
                  cursor='pointer'
                  color='clique.secondaryRed'
                ></Icon>
                <Text ml='2' color='clique.secondaryRed'>
                  {videoSideMenu.text}
                </Text>
              </Flex>
            </Box>
          ) : null}
          {playlist.userId._id === userProfile?._id && (
            <Box
              cursor={'pointer'}
              onClick={() => setShow((prevShow) => !prevShow)}
              bg='clique.black'
              p='3px'
              borderRadius={'5px'}
            >
              <Icon as={MoreIcon} />
            </Box>
          )}
        </Box>
      }
      <Sure
        isOpen={isOpen}
        isLoading={deleteVideoStatus.isLoading}
        onClose={onClose}
        header='Remove content from Playlist'
        description='Are you sure you want to remove this content from your playlist?'
        buttonText='Remove'
        onClick={() => {
          handleDelete(playlist._id, videoId);
        }}
      />
    </>
  );
};

const videoSideMenu = {icon: TrashIconRed, text: 'Remove Video'};

export default PlaylistList;
