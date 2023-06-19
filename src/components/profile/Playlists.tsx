import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useAppSelector} from 'redux/app/hooks';
import {
  useDeletePlaylistMutation,
  useGetPlaylistQuery,
} from 'redux/services/playlist.service';

import {
  Avatar,
  Box,
  Circle,
  Flex,
  HStack,
  Icon,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Sure from '@components/channel/Sure';
import EmptyState from '@components/emptyState/EmptyState';
import {scrollBarStyle3} from '@constants/utils';
import AddPlaylistIcon from '@icons/AddPlaylistIcon';
import TrashIcon from '@icons/TrashIcon';

import VideoIcon from '../../assets/icons/VideoIcon';
import NewPlaylist from './NewPlaylist';
import {Playlist} from './PlaylistDetails';

const Playlists = ({newPlaylist, id}: {newPlaylist?: boolean; id: string}) => {
  const {data, isLoading, isFetching} = useGetPlaylistQuery(id);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {
    isOpen: isOpenSure,
    onOpen: onOpenSure,
    onClose: onCloseSure,
  } = useDisclosure();
  const router = useRouter();
  const [deletePlaylist, deletePlaylistStatus] = useDeletePlaylistMutation();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const toast = useToast();
  const [playlistId, setPlaylistId] = useState('');
  const {colorMode, toggleColorMode} = useColorMode();

  let content;
  if (isLoading || !data) {
    content = (
      <SimpleGrid
        autoColumns={'300px'}
        mt='20px'
        columns={{base: 1, lg: 3, mlg: 3, xl: 4}}
        w={'100%'}
        spacing={'30px'}
      >
        {[1, 2, 3].map((i) => (
          <Flex
            key={i}
            h='150px'
            bg={
              colorMode === 'dark'
                ? 'clique.blackGrey'
                : 'clique.lightPrimaryBg'
            }
            flexDirection={'column'}
            p='1'
          >
            <Skeleton
              w={{base: '100%', lg: '300px'}}
              h='100%'
              borderRadius={'7px'}
            />
            <Flex align={'center'} mt='1'>
              <SkeletonCircle size='10' mr='1' />
              <Skeleton w='70px' h='20px' borderRadius={'3px'} />
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
    );
  } else if (!isLoading && data?.data?.playlists.length === 0) {
    content = (
      <Box h={{base: '30vh', lg: '100%'}}>
        <EmptyState msg='Oops! No playlist here yet.' />
      </Box>
    );
  } else {
    content = (
      <SimpleGrid
        autoColumns={'300px'}
        mt='20px'
        columns={{base: 1, lg: 3, mlg: 3, xl: 4}}
        w={'100%'}
        spacing={'30px'}
      >
        {data?.data?.playlists?.map((each: Playlist) => (
          <>
            <Box key={each?._id} position='relative'>
              <Box
                h={{base: '150px', lg: '130px', mlg: '180px'}}
                maxH={{lg: '200px'}}
                position={'relative'}
                cursor={'pointer'}
                onClick={() => router.push(`/playlist/${each._id}`)}
              >
                {each?.cover ? (
                  <Image
                    w='100%'
                    h='100%'
                    src={each?.cover}
                    alt=''
                    objectFit={'cover'}
                    borderRadius='10px'
                  />
                ) : (
                  <Flex
                    w='100%'
                    h='100%'
                    borderRadius='10px'
                    bg='linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), #232323'
                  ></Flex>
                )}

                <Box
                  position={'absolute'}
                  h='100%'
                  w='83px'
                  top='0'
                  right='0'
                  background='rgba(0, 0, 0, 0.6)'
                  backdropFilter='blur(5px)'
                  borderRadius='0px 10px 10px 0px'
                  display={'flex'}
                  flexDirection='column'
                  justifyContent={'center'}
                >
                  <Icon as={VideoIcon} />
                  <Text
                    textAlign={'center'}
                    fontSize='smSubHead'
                    lineHeight='20px'
                    color='clique.white'
                  >
                    {
                      each?.videos?.filter((each) => each?.video !== null)
                        ?.length
                    }{' '}
                    {each?.videos?.filter((each) => each?.video !== null)
                      ?.length !== 1
                      ? 'videos'
                      : 'video'}
                  </Text>
                </Box>
              </Box>
              <Text
                display={'flex'}
                alignItems='center'
                fontWeight='600'
                fontSize='subHead'
                lineHeight='17px'
                letterSpacing='-0.05em'
                // color='clique.white'
                mt='.7rem'
              >
                {newPlaylist ? (
                  <>
                    {each?.userId?.channel_id?.photo ? (
                      <Image
                        src={each?.userId?.channel_id?.photo}
                        marginRight={'.7rem'}
                        w='34px'
                        h='34px'
                        borderRadius='50%'
                        objectFit={'cover'}
                        alt=''
                      />
                    ) : (
                      <Circle
                        size='34px'
                        bg='#232323'
                        color='white'
                        marginRight={'.7rem'}
                      ></Circle>
                    )}
                  </>
                ) : (
                  <Avatar
                    src={each?.userId?.channel_id?.photo}
                    marginRight={'.7rem'}
                    size='sm'
                    name={each?.userId?.channel_id?.name}
                  />
                )}

                {each?.name}
              </Text>
              {each?.userId?._id === userProfile._id && (
                <Box
                  position={'absolute'}
                  bottom='0'
                  right='0.2'
                  sx={{
                    transition: 'all 3s ease-in-out',
                  }}
                >
                  <Flex
                    align='center'
                    justifyItems={'center'}
                    mb='2'
                    cursor='pointer'
                    onClick={() => {
                      onOpenSure();
                      setPlaylistId(each?._id);
                    }}
                  >
                    <Icon
                      as={TrashIcon}
                      fontSize='15px'
                      cursor='pointer'
                    ></Icon>
                  </Flex>
                </Box>
              )}
            </Box>
          </>
        ))}
      </SimpleGrid>
    );
  }

  return (
    <>
      {newPlaylist && router.query.name === 'content' ? (
        <Text
          display='flex'
          alignItems={'center'}
          fontSize='head'
          lineHeight='32px'
          // color='clique.white'
        >
          New Playlist
          <Box
            onClick={() => {
              onOpen();
            }}
          >
            <Icon as={AddPlaylistIcon} />
          </Box>
        </Text>
      ) : null}
      {content}

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInRight'
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent
          maxW={{base: '340px', lg: '400px'}}
          w={{base: '340px', lg: '400px'}}
          bottom='0'
          minH='100vh'
          overflowY={'scroll'}
          sx={scrollBarStyle3}
          m='0'
          py='30px'
          position={'absolute'}
          right={0}
          bg={useColorModeValue('clique.lightPrimaryBg', 'clique.black')}
        >
          <NewPlaylist onClose={onClose} />
        </ModalContent>
      </Modal>
      <Sure
        isOpen={isOpenSure}
        onClose={onCloseSure}
        header='Delete Playlist'
        description='Are you sure you want to delete this playlist?'
        buttonText='Delete'
        isLoading={deletePlaylistStatus.isLoading}
        onClick={async () => {
          await deletePlaylist(playlistId);
          toast({
            title: 'Playlist deleted successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
          onCloseSure();
        }}
      />
    </>
  );
};

export default Playlists;
