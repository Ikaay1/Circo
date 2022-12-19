import { useRouter } from 'next/router';

import { Box } from '@chakra-ui/react';

import PlaylistList from './PlaylistList';

export type Playlist = {
  cover: string;
  createdAt: string;
  name: string;
  updatedAt: string;
  userId: {
    photo: string;
    _id: string;
  };
  videos: Videos[];
  _id: string;
};

export interface Videos {
  category_name: string;
  thumbNail: string;
  title: string;
  video: string;
  _id: string;
  uploader_firstName: string;
  uploader_lastName: string;
  uploader_id: string;
}

export interface PlaylistProps {
  playlist?: Playlist;
}
const PlaylistDetails = ({
  playlist,
  isLoading,
}: {
  playlist?: Playlist;
  isLoading?: Boolean;
}) => {
  return (
    <Box display={'flex'} px='1.4rem' py='2rem' gap='25px'>
      <Box flex='5'>
        <PlaylistList
          videos={playlist?.videos as Videos[]}
          id={playlist?.userId?._id as string}
          isLoading={isLoading as boolean}
        />
      </Box>
    </Box>
  );
};

export default PlaylistDetails;
