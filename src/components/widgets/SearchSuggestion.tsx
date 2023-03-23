import {useRouter} from 'next/router';
import React from 'react';
import {AiOutlineSearch} from 'react-icons/ai';
import {useGetSearchSuggestionQuery} from 'redux/services/content.service';

import {Box, Flex, Icon, Text, useColorModeValue} from '@chakra-ui/react';
import Color from '@constants/color';
import SlantArrow from '@icons/SlantArrow';

const SearchSuggestion = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {data} = useGetSearchSuggestionQuery(search);
  const router = useRouter();
  console.log('searchSuggestion', data);
  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      w={{base: '90%', lg: '500px'}}
      borderBottomLeftRadius='15px'
      borderBottomRightRadius='15px'
      //   border='1px solid red'
      position={'fixed'}
      top='10vh'
      left={{base: '20px', lg: '280px'}}
      //   bg='red'
      bg={useColorModeValue('clique.white', 'clique.primaryBg')}
      zIndex={'9999'}
      p='.7rem'
    >
      {data?.data?.preference?.map(
        (eachSuggestion: {title: string; _id: string}) => (
          <Flex
            mt='.7rem'
            alignItems={'center'}
            justifyContent={'space-between'}
            key={eachSuggestion._id}
          >
            <Flex alignItems={'center'}>
              <Icon
                fontSize={'smHead'}
                as={AiOutlineSearch}
                cursor={'pointer'}
                color={Color().blackAndPureWhite}
                mr='.6rem'
                h={{base: '18px', lg: '20px'}}
                w={{base: '18px', lg: '20px'}}
                onClick={() => router.push(`/search/${eachSuggestion.title}`)}
              />
              <Text
                color='#B3B3B3'
                noOfLines={1}
                fontSize={{base: '13px', lg: '16px'}}
              >
                <Box as='span' color={Color().blackAndPureWhite}>
                  {eachSuggestion.title.slice(0, search?.length)}
                </Box>
                {eachSuggestion.title.slice(search?.length)}
              </Text>
            </Flex>
            <Icon
              h={{base: '18px', lg: '20px'}}
              w={{base: '18px', lg: '20px'}}
              as={SlantArrow}
              color={Color().blackAndPureWhite}
              onClick={() => setSearch(eachSuggestion.title)}
              cursor={'pointer'}
            />
          </Flex>
        ),
      )}
    </Box>
  );
};

export default SearchSuggestion;
