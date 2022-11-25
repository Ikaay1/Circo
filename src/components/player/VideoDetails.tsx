import React from 'react';
import { useAppSelector } from 'redux/app/hooks';
import { useSubscribeMutation } from 'redux/services/user.service';

import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';

import { contentData } from '../../constants/utils';

function VideoDetails({
  video,
  subscribers,
}: {
  video: contentData;
  subscribers: string[];
}) {
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const [subscribe, subscribeStatus] = useSubscribeMutation();

  return (
    <Box mt='20px'>
      <Text
        textAlign={'left'}
        fontFamily={'Poppins'}
        fontWeight={500}
        textTransform={'capitalize'}
        fontSize='smHead'
      >
        {video.title}
      </Text>
      <Flex my='10px' justifyContent={'space-between'} alignItems='center'>
        <Flex alignItems='center'>
          <Flex
            mr='20px'
            alignItems={'center'}
            justifyContent='center'
            p='4px'
            border={'4px solid'}
            borderColor='clique.base'
            rounded='full'
          >
            <Avatar
              p='0'
              size='md'
              name='Prosper Otemuyiwa'
              src='https://bit.ly/prosper-baba'
            />
          </Flex>

          <Box>
            <Text
              noOfLines={2}
              color={'clique.white'}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize='subHead'
              lineHeight={'1.2'}
            >
              {`${
                video.uploader_id.firstName[0].toUpperCase() +
                video.uploader_id.firstName.slice(1)
              } ${
                video.uploader_id.lastName[0].toUpperCase() +
                video.uploader_id.lastName.slice(1)
              }`}
            </Text>
            <Text
              mt='5px'
              noOfLines={2}
              color={'clique.darkGrey'}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize='smSubHead'
              lineHeight={'1.2'}
            >
              {`${subscribers.length} ${
                subscribers.length === 1 ? 'subscriber' : 'subscribers'
              }`}
            </Text>
          </Box>
        </Flex>
        {video.uploader_id._id !== userProfile._id && (
          <Box
            p='.6rem 1.2rem'
            rounded='full'
            fontWeight={400}
            bg={'clique.grey'}
          >
            Subscribed
          </Box>
        )}
      </Flex>
      <Text
        mt='5px'
        noOfLines={2}
        color={'clique.darkGrey'}
        fontFamily={'Poppins'}
        fontWeight={400}
        fontSize='smSubHead'
        lineHeight={'1.2'}
      >
        Video Description
      </Text>{' '}
      <Text
        mt='5px'
        color={'clique.white'}
        fontFamily={'Poppins'}
        fontWeight={400}
        fontSize='smSubHead'
        lineHeight={'1.5'}
        w='70%'
      >
        {video.description}
      </Text>
    </Box>
  );
}

export default VideoDetails;
