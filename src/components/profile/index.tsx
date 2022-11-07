import { useRouter } from 'next/router';
import React from 'react';

import { Box } from '@chakra-ui/react';
import UserDetail from '@components/channel/UserDetail';
import ProfileContents from '@components/profile/ProfileContents';
import { scrollBarStyle } from '@constants/utils';

import EditProfile from './EditProfile';

const Index = () => {
  const router = useRouter();
  return (
    <Box
      height={'100%'}
      overflowY='scroll'
      position={'relative'}
      pb='3rem'
      sx={scrollBarStyle}
    >
      <UserDetail />

      {router.query.name === 'content' && (
        <Box mt={'15rem'} px='1.35rem'>
          <ProfileContents />
        </Box>
      )}

      {router.query.name === 'edit' && (
        <Box mt={'8.5rem'} px='1.35rem'>
          <EditProfile />
        </Box>
      )}
    </Box>
  );
};

export default Index;
