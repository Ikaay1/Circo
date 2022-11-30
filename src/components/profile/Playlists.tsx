import { useRouter } from 'next/router';
import { useGetPlaylistQuery } from 'redux/services/playlist.service';

import {
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
	useDisclosure,
} from '@chakra-ui/react';
import EmptyState from '@components/emptyState/EmptyState';
import { scrollBarStyle } from '@constants/utils';
import AddPlaylistIcon from '@icons/AddPlaylistIcon';

import VideoIcon from '../../assets/icons/VideoIcon';
import NewPlaylist from './NewPlaylist';
import { Playlist } from './PlaylistDetails';

const Playlists = ({newPlaylist, id}: {newPlaylist?: boolean; id: string}) => {
  const {data, isLoading, isFetching} = useGetPlaylistQuery(id);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const router = useRouter();
  console.log(data?.data?.playlists);
  let content;
  if (isLoading || !data) {
    content = (
      <HStack spacing='24px'>
        {[1, 2, 3].map((i) => (
          <Flex
            key={i}
            h='150px'
            bg='clique.blackGrey'
            flexDirection={'column'}
            p='1'
          >
            <Skeleton w='300px' h='100%' borderRadius={'7px'} />
            <Flex align={'center'} mt='1'>
              <SkeletonCircle size='10' mr='1' />
              <Skeleton w='70px' h='20px' borderRadius={'3px'} />
            </Flex>
          </Flex>
        ))}
      </HStack>
    );
  } else if (!isLoading && data?.data?.playlists.length === 0) {
    content = <EmptyState msg='Oops! No playlist here yet.' />;
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
          <Box key={each?._id}>
            <Box
              h={{lg: '130px', mlg: '180px'}}
              maxH='200px'
              position={'relative'}
              cursor={'pointer'}
              onClick={() =>
                router.push(`/channel/1/content/playlist/${each._id}`)
              }
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
                  {each?.videos?.length}{' '}
                  {each?.videos?.length !== 1 ? 'videos' : 'video'}
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
              color='clique.white'
              mt='.7rem'
            >
              {each?.userId?.photo ? (
                <Image
                  src={each?.userId?.photo}
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

              {each?.name}
            </Text>
          </Box>
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
          color='clique.white'
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
          maxW='400px'
          w='400px'
          bottom='0'
          minH='100vh'
          overflowY={'scroll'}
          sx={scrollBarStyle}
          m='0'
          py='30px'
          position={'absolute'}
          right={0}
          bg='clique.black'
        >
          <NewPlaylist onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Playlists;
