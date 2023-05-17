import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {useGetSubscriptionsQuery} from 'redux/services/user.service';

import {
  Avatar,
  Box,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
  WrapItem,
} from '@chakra-ui/react';
import Color from '@constants/color';
import CloseIcon from '@icons/CloseIcon';

const Subscriptions = () => {
  const [search, setSearch] = useState('');
  const {data, isFetching} = useGetSubscriptionsQuery({
    page: 1,
    limit: 30,
    search,
  });

  const router = useRouter();

  return (
    <Box p='1rem' pb='1.5rem'>
      <Text
        fontWeight='500'
        fontSize='smHead2'
        lineHeight='36px'
        letterSpacing='-0.02em'
        textAlign={'center'}
      >
        Subscriptions
      </Text>
      <InputGroup mt='1rem' w='100%'>
        <Input
          bg={useColorModeValue(' clique.primaryWhiteBg', 'clique.inputBg')}
          _focus={{
            boxShadow: 'none',
            border: '2px solid',
            borderColor: useColorModeValue(
              'clique.secondaryGrey5',
              ' clique.inputBorder',
            ),
          }}
          border={'1px solid'}
          borderColor={useColorModeValue(
            'clique.secondaryGrey5',
            ' clique.inputBorder',
          )}
          rounded='full'
          type='text'
          fontFamily={'Poppins'}
          _placeholder={{
            color: Color().blackAndWhite,
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search'
        />
        {search && (
          <InputRightElement>
            <Icon
              fontSize={'smHead'}
              color={Color().blackAndWhite}
              as={CloseIcon}
              cursor={'pointer'}
              onClick={() => {
                setSearch('');
              }}
            />
          </InputRightElement>
        )}
      </InputGroup>

      <Box mt='1.8rem'>
        {isFetching ? (
          <>
            {[1, 2].map((each) => (
              <Skeleton
                key={each}
                marginTop='.85rem'
                w='100%'
                h='100px'
                borderRadius={'10px'}
              />
            ))}
          </>
        ) : !isFetching && !data?.data?.user?.length ? (
          <>
            <Text textAlign={'center'} fontSize={'18px'}>
              No results
            </Text>
          </>
        ) : (
          <>
            {data?.data?.user?.map(
              ({
                _id: userId,
                channel_id: {_id, name, photo},
              }: {
                _id: string;
                channel_id: {_id: string; name: string; photo: string};
              }) => (
                <Box
                  display={'flex'}
                  justifyContent='space-between'
                  alignItems={'center'}
                  marginTop='.85rem'
                  key={_id}
                >
                  <Box display={'flex'} alignItems='center'>
                    <WrapItem>
                      <Avatar
                        cursor='pointer'
                        onClick={() => router.push(`/channel/${name}`)}
                        w='57px'
                        h='57px'
                        name={name}
                        src={photo}
                      />
                    </WrapItem>

                    <Text
                      fontSize='subHead'
                      lineHeight='31px'
                      pl='.7rem'
                      _hover={{
                        textDecoration: 'underline',
                      }}
                      cursor='pointer'
                      onClick={() => router.push(`/channel/${name}`)}
                    >
                      {name}
                    </Text>
                  </Box>
                  <Text
                    fontSize='sm'
                    lineHeight='26px'
                    color={
                      'active' === 'active' ? 'clique.green' : 'clique.red'
                    }
                  >
                    {'active' === 'active' ? 'Active' : 'Expired'}
                  </Text>
                </Box>
              ),
            )}
          </>
        )}
      </Box>
      {1 < data?.data?.totalPages ? (
        <Text mt='1rem' textAlign={'center'} color={'clique.base'}>
          Search to get other results that are not shown
        </Text>
      ) : null}
    </Box>
  );
};

export default Subscriptions;
