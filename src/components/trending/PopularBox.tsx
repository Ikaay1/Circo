import React from 'react';
import {useGetSearchHistoryQuery} from 'redux/services/content.service';
import {useGetPopularCreatorsQuery} from 'redux/services/user.service';

import {
  Box,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Text,
} from '@chakra-ui/react';
import Color from '@constants/color';
import {purpleBoxStyle} from '@constants/utils';

import SearchInterface from '../../constants/interface';
import CreatorAvatarBox from './CreatorAvatarBox';
import SearchProgressBar from './SearchProgressBar';

function PopularBox() {
  const {data, isFetching} = useGetPopularCreatorsQuery({
    page: 1,
    limit: 6,
  });
  const {data: searchData, isFetching: searchIsFetching} =
    useGetSearchHistoryQuery({page: 1, limit: 8});

  console.log('searchData', searchData);

  return (
    <Box
      minW={{base: '100%', lg: '30%'}}
      maxW={{base: '100%', lg: '30%'}}
      h='100%'
      order={{base: -1, lg: 1}}
    >
      <Text
        position={'relative'}
        pl='20px'
        _before={purpleBoxStyle}
        color={Color().blackAndWhite}
        fontFamily={'Poppins'}
        fontWeight={500}
        textTransform={'capitalize'}
        fontSize='head'
        lineHeight={'1'}
      >
        Popular Creators
      </Text>

      {isFetching ? (
        <Skeleton
          display={'flex'}
          gap='0 10px'
          h='170px'
          w='100%'
          rounded={'20px'}
          p='20px'
          mt='30px'
        ></Skeleton>
      ) : (
        <SimpleGrid
          // h='220px'
          bg='clique.white'
          spacingX={'10px'}
          spacingY={'12px'}
          columns={{base: 4, lg: 3}}
          rounded={'20px'}
          p='20px'
          mt='30px'
        >
          <>
            {data?.data?.preference?.user.map((user: any) => (
              <Box key={user._id}>
                <CreatorAvatarBox user={user} />
              </Box>
            ))}
          </>
        </SimpleGrid>
      )}

      <Text
        mt='30px'
        position={'relative'}
        pl='20px'
        _before={purpleBoxStyle}
        color={Color().blackAndWhite}
        fontFamily={'Poppins'}
        fontWeight={500}
        textTransform={'capitalize'}
        fontSize='head'
        lineHeight={'1'}
      >
        Top Searches
      </Text>

      {searchIsFetching ? (
        <Skeleton h='450px' w='100%' rounded={'20px'} mt='30px'></Skeleton>
      ) : (
        <>
          <Box
            bgImage={'/assets/searchbg.png'}
            bgPosition={'center'}
            bgSize={'cover'}
            bgRepeat={'no-repeat'}
            rounded={'20px'}
            px='30px'
            pt='40px'
            pb='65px'
            mt='30px'
          >
            {searchData?.data?.preference?.search.map(
              (searchWord: SearchInterface) => (
                <Box key={searchWord._id}>
                  <SearchProgressBar
                    highest={searchData?.data?.preference?.search[0]?.count}
                    searchWord={searchWord}
                  />
                </Box>
              ),
            )}
          </Box>
        </>
      )}
    </Box>
  );
}

export default PopularBox;
