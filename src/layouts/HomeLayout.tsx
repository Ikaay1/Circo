import React, {useEffect, useState} from 'react';
import {useAppSelector} from 'redux/app/hooks';
import {IHomeLayoutProps} from 'types';

import {Box, useColorModeValue} from '@chakra-ui/react';
import Header from '@components/widgets/Header';

import ProtectedRoute from './ProtectedRoute';

function HomeLayout({children, upload, toggleView}: IHomeLayoutProps) {
  const {token} = useAppSelector((store) => store.app.userReducer);
  const [showSuggestions, setShowSuggestions] = useState(false);

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
      bg={useColorModeValue('clique.lightPrimaryBg', 'clique.primaryBg')}
      onClick={() => setShowSuggestions(false)}
    >
      <Header
        upload={upload}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      />
      {children}
    </Box>
  );
}

export default ProtectedRoute(HomeLayout);
