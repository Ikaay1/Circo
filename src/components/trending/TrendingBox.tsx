import React from 'react';
import { useGetTrendingQuery } from 'redux/services/content.service';

import { Box, Flex, Skeleton, Text } from '@chakra-ui/react';
import { purpleBoxStyle } from '@constants/utils';

import { contentData } from '../../constants/utils';
import TrendCard from './TrendCard';

function TrendingBox() {
  const {data, isFetching} = useGetTrendingQuery({page: 1, limit: 7});
  return (
    <Box minW={'70%'} maxW='70%' h='100%'>
      <Text
        position={'relative'}
        pl='20px'
        _before={purpleBoxStyle}
        color={'clique.white'}
        fontFamily={'Poppins'}
        fontWeight={500}
        textTransform={'capitalize'}
        fontSize='head'
        lineHeight={'1'}
      >
        Trending
      </Text>
      {isFetching ? (
        <>
          {[1, 2, 3, 4].map((num) => (
            <Flex
              cursor={'pointer'}
              position={'relative'}
              alignItems={'center'}
              rounded={'20px'}
              px='50px'
              py='20px'
              mt='30px'
              h='220px'
              key={num}
            >
              <Skeleton h='100%' rounded={'20px'} w='100%' />
            </Flex>
          ))}
        </>
      ) : (
        <>
          {data?.data?.preference?.videos.map(
            (video: contentData, i: number) => (
              <Box key={video._id}>
                <TrendCard
                  position={i < 10 ? `0${i + 1}` : `${i + 1}`}
                  video={video}
                />
              </Box>
            ),
          )}
        </>
      )}
    </Box>
  );
}

export default TrendingBox;
