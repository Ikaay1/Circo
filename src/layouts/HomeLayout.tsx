import React, { useEffect } from 'react';
import { useAppSelector } from 'redux/app/hooks';
import { IHomeLayoutProps } from 'types';

import { Box, useColorModeValue } from '@chakra-ui/react';
import Header from '@components/widgets/Header';

import ProtectedRoute from './ProtectedRoute';

function HomeLayout({children, upload, toggleView}: IHomeLayoutProps) {
  const {token} = useAppSelector((store) => store.app.userReducer);

  useEffect(() => {
    if (!token) {
      window.location.replace('/login');
    }
  }, [token]);

  return (
    <Box
      maxH={toggleView ? '' : '100vh'}
      maxW={'100vw'}
      w='100vw'
      h={toggleView ? '' : '100vh'}
      // overflowY={"hidden"}
      bg={useColorModeValue('clique.primaryBg', 'clique.primaryBg')}
    >
      <Header upload={upload} />
      {children}
    </Box>
  );
}

export default ProtectedRoute(HomeLayout);
