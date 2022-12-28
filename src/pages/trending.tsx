import HomeLayout from 'layouts/HomeLayout';
import React from 'react';

import { Box, Flex, HStack } from '@chakra-ui/react';
import LiveEvents from '@components/home/LiveEvents';
import PopularBox from '@components/trending/PopularBox';
import TrendingBox from '@components/trending/TrendingBox';
import SideMenu from '@components/widgets/sideMenu';
import { scrollBarStyle3 } from '@constants/utils';

import { scrollBarStyle } from '../constants/utils';

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
          maxW={{base: '100%', lg: 'calc(100vw - 500px)'}}
          minW={{base: '100%', lg: 'calc(100vw - 500px)'}}
          overflowY={'scroll'}
          overflowX={'hidden'}
          sx={scrollBarStyle3}
        >
          <HStack
            flexDirection={{base: 'column', lg: 'row'}}
            alignItems={'flex-start'}
            minH='100%'
            spacing={{lg: '20px'}}
          >
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
