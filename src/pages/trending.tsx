import HomeLayout from 'layouts/HomeLayout';
import React from 'react';

import { Box, Flex, HStack } from '@chakra-ui/react';
import LiveEvents from '@components/home/LiveEvents';
import PopularBox from '@components/trending/PopularBox';
import TrendingBox from '@components/trending/TrendingBox';
import SideMenu from '@components/widgets/sideMenu';
import { scrollBarStyle } from '@constants/utils';

function Index() {
  return (
    <HomeLayout>
      <Flex>
        <SideMenu />
        <Box
          maxH={'90vh'}
          minH={'90vh'}
          pb='50px'
          px='30px'
          pt='30px'
          maxW={'calc(100vw - 500px)'}
          minW={'calc(100vw - 500px)'}
          overflowY={'scroll'}
          overflowX={'hidden'}
          sx={scrollBarStyle}
        >
          <HStack alignItems={'flex-start'} minH='100%' spacing={'20px'}>
            <TrendingBox />
            <PopularBox />
          </HStack>
        </Box>
        <LiveEvents />
      </Flex>
    </HomeLayout>
  );
}

export default Index;
