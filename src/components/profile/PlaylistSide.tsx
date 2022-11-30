import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useGetPlaylistQuery } from 'redux/services/playlist.service';

import {
	Box,
	Flex,
	Image,
	Skeleton,
	SkeletonCircle,
	Text,
	VStack,
} from '@chakra-ui/react';
import ProfileDetails from '@components/channel/ProfileDetails';

import PlaylistList from './PlaylistList';

export type Playlist = {
  cover: string;
  createdAt: string;
  name: string;
  updatedAt: string;
  userId: string;
  videos: Videos[];
  _id: string;
};

export interface Videos {
  category_name: string;
  thumbNail: string;
  title: string;
  video: string;
  _id: string;
}

export interface PlaylistProps {
  playlist?: Playlist;
}
const PlaylistSide = ({
  playlist,
  isLoading,
  id,
}: {
  playlist?: Playlist;
  isLoading?: Boolean;
  id: string;
}) => {
  const router = useRouter();
  const [state, setState] = useState<Array<Playlist>>();
  const {data, isLoading: playLoading, isFetching} = useGetPlaylistQuery(id);
  console.log('state', state);

  useEffect(() => {
    if (!isLoading && data && playlist) {
      const otherPlaylist = data?.data?.playlists?.filter((each: any) => {
        return each._id !== playlist._id;
      });
      setState(otherPlaylist);
    }
  }, [isLoading, data, playlist]);
  return (
    <Box>
      {!isLoading && playlist ? (
        <Box mt='3rem'>
          {playlist?.cover ? (
            <Image
              src={playlist?.cover}
              w='100%'
              objectFit={'cover'}
              h='150px'
              borderRadius='10px'
              alt=''
            />
          ) : (
            <Flex
              w='100%'
              h='150px'
              borderRadius='10px'
              bg='linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), #232323'
            ></Flex>
          )}

          <Text
            fontFamily={'Poppins'}
            fontSize='sm2'
            lineHeight='28px'
            color='clique.white'
            textAlign={'center'}
            mt='1.1rem'
          >
            {playlist?.name}
          </Text>
          <Text
            fontFamily={'Poppins'}
            fontSize='smSubHead'
            lineHeight='24px'
            color='clique.secondaryGrey2'
            textAlign={'center'}
          >
            {playlist?.videos?.length} Videos
          </Text>
        </Box>
      ) : (
        <Box>
          <Skeleton h='150px' borderRadius='10px' />
          <VStack w='100%' mt='2'>
            <Skeleton w='50%' height='15px' />
            <Skeleton w='30%' height='10px' />
          </VStack>
        </Box>
      )}
      <Box>
        <Text color='clique.text' fontSize={'sm'} mb='3'>
          Playlist
        </Text>
        {state?.map((each, i) => {
          return (
            <Text
              key={i}
              cursor='pointer'
              onClick={() =>
                router.push(`/channel/1/content/playlist/${each._id}`)
              }
              fontSize={'subHead'}
              mb='3'
              color='clique.white'
            >
              {each.name}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
};

export default PlaylistSide;
