import React from 'react';
import { useAppSelector } from 'redux/app/hooks';
import { useSubscribeMutation } from 'redux/services/user.service';

import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';

import { API, contentData } from '../../constants/utils';

function VideoDetails({
  video,
  setSubscribers,
  subscribers,
}: {
  video: contentData;
  setSubscribers: React.Dispatch<React.SetStateAction<string[]>>;
  subscribers: string[];
}) {
  console.log(video);
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const [subscribe, subscribeStatus] = useSubscribeMutation();

  const handleSubscribe = async (id: string) => {
    const isSubscribed = subscribers.find((theId) => theId === userProfile._id);
    const subscribeData = {subscribingToId: id};
    if (isSubscribed) {
      setSubscribers(
        subscribers.filter((eachId) => eachId !== userProfile._id),
      );
    } else {
      setSubscribers([...subscribers, userProfile._id]);
    }
    subscribe(subscribeData).then((res) => {
      console.log('successfully subscribed/unsubscribed');
    });
  };

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
                subscribers.length === 1 ? 'subcriber' : 'subscribers'
              }`}
            </Text>
          </Box>
        </Flex>
        <Button
          rounded='full'
          fontWeight={400}
          bg={
            subscribers.includes(userProfile._id)
              ? 'clique.grey'
              : 'clique.purple'
          }
          cursor='pointer'
          onClick={() => handleSubscribe(video.uploader_id._id)}
        >
          {subscribers.includes(userProfile._id) ? 'Subscribed' : 'Subscribe'}
        </Button>
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
