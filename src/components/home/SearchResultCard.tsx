import {useRouter} from 'next/router';
import React from 'react';
import {useAppSelector} from 'redux/app/hooks';
import {useSubscribeToUserChannelMutation} from 'redux/services/content.service';

import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import SubscribeModal from '@components/channel/SubscribeModal';
import Color from '@constants/color';

const SearchResultCard = ({
  user,
}: {
  user: {
    _id: string;
    channel_id: {
      photo: string;
      name: string;
      subscriptionFee: number;
      subscriptionInfo: string;
      bio: string;
      userId: string;
    };
    firstName: string;
    lastName: string;
    subscribersCount: number;
    subscribers: string[];
  };
}) => {
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [subcribeToUserChannnel, subcribeToUserChannnelStatus] =
    useSubscribeToUserChannelMutation();
  const toast = useToast();
  const subscribeHandler = async () => {
    const res: any = await subcribeToUserChannnel({
      amount: user?.channel_id?.subscriptionFee
        ? user?.channel_id?.subscriptionFee
        : 0,
      description: 'Channel Subscription',
      receiversId: user?.channel_id?.userId,
    });
    if ('data' in res) {
      toast({
        title: res.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    } else if (res.error?.data?.message) {
      toast({
        title: res.error?.data?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      toast({
        title: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      mt='1.1rem'
      width={{base: '100%', lg: '600px'}}
      background={Color().whiteAndBlackGrey}
      borderRadius='14px'
      px='1.4rem'
      py='.65rem'
      gap={'0 13px'}
    >
      <Flex alignItems={'center'}>
        <Flex
          flexShrink={0}
          cursor='pointer'
          alignItems={'center'}
          justifyContent='center'
          p='4px'
          border={'4px solid'}
          borderColor={'clique.base'}
          rounded='full'
          mr='1.6rem'
          onClick={
            user?._id === userProfile._id
              ? () => router.push(`/myChannel/content`)
              : () => router.push(`/channel/${user?.channel_id?.name}`)
          }
        >
          <Avatar
            p='0'
            size={{base: 'sm', lg: 'md'}}
            name={user?.channel_id?.name}
            src={user?.channel_id?.photo}
          />
        </Flex>
        <Box>
          <Text
            fontFamily='Poppins'
            fontStyle='normal'
            fontSize={{base: 'subHead', lg: 'smHead2'}}
            lineHeight='34px'
            noOfLines={1}
            onClick={
              user?._id === userProfile._id
                ? () => router.push(`/myChannel/content`)
                : () => router.push(`/channel/${user?.channel_id?.name}`)
            }
            cursor={'pointer'}
          >
            {user?.firstName + ' ' + user?.lastName}
          </Text>
          <Text
            fontFamily='Poppins'
            fontStyle='normal'
            fontSize={{base: 'smSubHead', lg: 'seventeen'}}
            lineHeight='28px'
            color={'clique.secondaryGrey2'}
            mt='.16rem'
            mb='.045rem'
            noOfLines={1}
          >
            @{user?.channel_id.name}
          </Text>
          <Text
            fontFamily='Poppins'
            fontStyle='normal'
            fontSize={{base: 'smSubHead', lg: 'seventeen'}}
            lineHeight='28px'
            color={'clique.secondaryGrey2'}
            noOfLines={1}
          >
            {user?.subscribersCount}{' '}
            {user?.subscribersCount === 1 ? 'SUBSCRIBER' : 'SUBSCRIBERS'}
          </Text>
        </Box>
      </Flex>
      <Button
        width={{base: '90px', lg: '118.8px'}}
        height={{base: '31px', lg: '39.2px'}}
        background={
          user?.subscribers?.includes(userProfile._id) ||
          user?._id === userProfile._id
            ? 'clique.grey'
            : 'clique.base'
        }
        borderRadius='42px'
        fontFamily='Poppins'
        fontStyle='normal'
        fontSize={{base: 'sm3', lg: 'smSubHead'}}
        lineHeight='28px'
        color={'clique.white'}
        cursor={
          user?.subscribers?.includes(userProfile._id) ||
          user?._id === userProfile._id
            ? 'default'
            : 'pointer'
        }
        onClick={
          user?.subscribers?.includes(userProfile._id) ||
          user?._id === userProfile._id
            ? () => {}
            : onOpen
        }
      >
        {user?.subscribers?.includes(userProfile._id) ||
        user?._id === userProfile._id
          ? 'SUBSCRIBED'
          : 'SUBSCRIBE'}
      </Button>
      <SubscribeModal
        isOpen={isOpen}
        onClose={onClose}
        onClick={subscribeHandler}
        bio={user?.channel_id?.bio}
        fee={user?.channel_id?.subscriptionFee}
        info={user?.channel_id?.subscriptionInfo}
        isLoading={false}
        status={subcribeToUserChannnelStatus}
      />
    </Flex>
  );
};

export default SearchResultCard;
