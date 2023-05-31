import React from 'react';
import {useGetChannelQuery} from 'redux/services/channel.service';

import {Avatar, Box, Flex, Icon, Spinner, Text} from '@chakra-ui/react';
import Color from '@constants/color';

const UploadPreview = ({
  thumbNail,
  title,
  isFree,
  url,
}: {
  thumbNail: any;
  title: string;
  isFree: boolean;
  url: string;
}) => {
  const {
    data: channelData,
    isError,
    isLoading: channelLoading,
  } = useGetChannelQuery('');
  console.log('urlll', url);
  return (
    <>
      {channelLoading ? (
        <Flex justifyContent={'center'} mt='2rem'>
          <Spinner />
        </Flex>
      ) : (
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

          {thumbNail ? (
            <Box>
              <Box
                h={{base: '200px', lg: '130px', mlg: '180px'}}
                bgImage={`url(${thumbNail})`}
                bgSize='cover'
                bgPosition='center'
                rounded={'10px'}
              />
            </Box>
          ) : (
            <video width='100%' height='130px' style={{borderRadius: '10px'}}>
              <source src={url} />
              Your browser does not support the video tag.
            </video>
          )}

          <Flex mt='15px'>
            <Avatar
              mr={'10px'}
              p='0'
              size='sm'
              name={channelData?.data?.channel?.name ?? 'Not Available'}
              src={channelData?.data?.channel?.photo}
            />

            <Box>
              <Text
                noOfLines={1}
                color={Color().blackAndPureWhite}
                fontFamily={'Poppins'}
                fontWeight={500}
                fontSize={'sm2'}
                lineHeight={'1.2'}
                w='190px'
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
                @{channelData?.data?.channel?.name ?? 'Not Available'}
              </Text>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default UploadPreview;
