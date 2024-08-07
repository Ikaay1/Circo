import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {useAppSelector} from 'redux/app/hooks';

import {Box} from '@chakra-ui/react';
import UserDetail from '@components/channel/UserDetail';
import ProfileContents from '@components/profile/ProfileContents';
import {scrollBarStyle, scrollBarStyle3} from '@constants/utils';

import EditProfile from './EditProfile';

const Index = () => {
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const router = useRouter();

  return (
    <Box
      height={'100%'}
      overflowY='scroll'
      position={'relative'}
      pb='3rem'
      sx={scrollBarStyle3}
    >
      {router.query.name === 'content' && (
        <>
          <UserDetail id={userProfile?._id} />
          <Box mt={'15rem'} px='1.35rem'>
            <ProfileContents />
          </Box>
        </>
      )}

      {router.query.name === 'edit' && <EditProfile />}
    </Box>
  );
};

export default Index;
