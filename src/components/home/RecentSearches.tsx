import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useGetUsersSearchQuery} from 'redux/services/content.service';

import {Box, Flex, Icon, Text} from '@chakra-ui/react';
import CloseIcon from '@icons/CloseIcon';

const RecentSearches = () => {
  const router = useRouter();
  const search = router.query?.search ? router.query?.search : '';
  const {data, isFetching} = useGetUsersSearchQuery(search);
  console.log('usersSearches', data);
  const [searches, setSearches] = useState<{word: string; _id: string}[]>([]);

  useEffect(() => {
    if (data) {
      setSearches(data?.data?.preference);
    }
  }, [data]);

  return (
    <Box mt='1rem'>
      {searches?.map((each: {word: string; _id: string}) => (
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          mt='.7rem'
          key={each?._id}
        >
          <Text
            background='clique.blackGrey'
            borderRadius='30px'
            fontFamily="'Poppins'"
            fontStyle='normal'
            lineHeight='20px'
            color='#FFFFFF'
            py='.4rem'
            px='.8rem'
          >
            {each?.word}
          </Text>
          <Icon
            onClick={() =>
              setSearches((prevSearches) =>
                prevSearches.filter(
                  (search: {word: string; _id: string}) =>
                    search?._id !== each._id,
                ),
              )
            }
            as={CloseIcon}
            w='24px'
            h='24px'
            cursor='pointer'
          />
        </Flex>
      ))}
    </Box>
  );
};

export default RecentSearches;
