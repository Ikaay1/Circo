import React from 'react';
import {useGetChannelQuery} from 'redux/services/channel.service';

import {Avatar, Box, Flex, Icon, Text} from '@chakra-ui/react';
import Color from '@constants/color';

const UploadPreview = ({
  thumbNail,
  title,
  isFree,
}: {
  thumbNail: any;
  title: string;
  isFree: boolean;
}) => {
  const {
    data: channelData,
    isError,
    isLoading: channelLoading,
  } = useGetChannelQuery('');
  return (
    <Box position={'relative'}>
      {isFree && (
        <Text
          bg='clique.freeColor'
          borderTopRightRadius={'8px'}
          borderBottomLeftRadius={'8px'}
          w='60px'
          h='21px'
          display={'flex'}
          justifyContent='center'
          alignItems={'center'}
          color='clique.black'
          fontWeight={'600'}
          position='absolute'
          top={'0'}
          right='0'
        >
          Free
        </Text>
      )}

      {thumbNail && typeof thumbNail !== 'string' ? (
        <Box cursor={'pointer'} w='full'>
          <Box
            h={{base: '200px', lg: '130px', mlg: '180px'}}
            bgImage={`url(${thumbNail})`}
            bgSize='cover'
            bgPosition='center'
            rounded={'10px'}
          />
        </Box>
      ) : null}

      <Box cursor={'pointer'} w='full'>
        <Box
          h={{base: '200px', lg: '130px', mlg: '180px'}}
          bgImage={`url(${thumbNail})`}
          bgSize='cover'
          bgPosition='center'
          rounded={'10px'}
        />
      </Box>

      <Flex mt='15px'>
        <Avatar
          mr={'10px'}
          p='0'
          size='sm'
          name={channelData?.data?.channel?.name ?? 'Not Available'}
          src={channelData?.data?.channel?.photo}
          cursor='pointer'
        />

        <Box w='calc(100%)'>
          <Text
            noOfLines={1}
            color={Color().blackAndPureWhite}
            fontFamily={'Poppins'}
            fontWeight={500}
            fontSize={'sm2'}
            lineHeight={'1.2'}
          >
            {title}
          </Text>

          <Text
            mt='5px'
            noOfLines={2}
            color={'clique.darkGrey'}
            fontFamily={'Poppins'}
            fontWeight={400}
            fontSize={'smSubHead'}
            lineHeight={'1.2'}
          >
            @{channelData?.data?.channel?.sname ?? 'Not Available'}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default UploadPreview;
