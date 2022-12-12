import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TbCopy } from 'react-icons/tb';
import { useAppSelector } from 'redux/app/hooks';
import { useUpdatePreferenceMutation } from 'redux/services/settings.service';

import { Box, Divider, Flex, Skeleton, Text } from '@chakra-ui/react';

import SimpleSwitch from './SimpleSwitch';

type Props = {
  onClick: (code: string) => void;
  data: Notification;
  isLoading: boolean;
};

type Notification = {
  allNotifications?: boolean;
  likeMyPost: boolean;
  commentOnMyPost: boolean;
  likeMyComment: boolean;
  mentionMe: boolean;
  newSubcriber: boolean;
  receivePayment: boolean;
  walletCredits: boolean;
  walletsDebits: boolean;
  liveStreamStarted: boolean;
  lightOrDark: boolean;
};

const defaultState = {
  likeMyPost: true,
  commentOnMyPost: true,
  likeMyComment: true,
  mentionMe: true,
  newSubcriber: true,
  receivePayment: true,
  walletCredits: true,
  walletsDebits: true,
  liveStreamStarted: true,
  lightOrDark: true,
  allNotifications: true,
};

const Notification = ({isLoading, data, onClick}: Props) => {
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const [updatePreference] = useUpdatePreferenceMutation();
  const [state, setState] = useState({
    allNotifications: false,
    likeMyPost: data ? data?.likeMyPost : false,
    commentOnMyPost: data ? data?.commentOnMyPost : false,
    likeMyComment: data ? data?.likeMyComment : false,
    mentionMe: data ? data?.mentionMe : false,
    newSubcriber: data ? data?.newSubcriber : false,
    receivePayment: data ? data?.receivePayment : false,
    walletCredits: data ? data?.walletCredits : false,
    walletsDebits: data ? data?.walletsDebits : false,
    liveStreamStarted: data ? data?.liveStreamStarted : false,
    lightOrDark: data ? data?.lightOrDark : false,
  });
  const router = useRouter()

  useEffect(() => {
    if (!userProfile?._id) {
      router.push('/login');
    }
  }, [userProfile?._id, router]);


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({...prev, [e.target.name]: e.target.checked}));
    if (e.target.name === 'allNotifications') {
      const apiState: Notification = {...defaultState};
      delete apiState.allNotifications;
      await updatePreference(apiState);
      setState(defaultState);
    } else {
      await updatePreference({[e.target.name]: e.target.checked});
    }
  };
  return (
    <>
      {isLoading ? (
        <Box maxW={'50%'}>
          <Box mb='5'>
            <Skeleton h='3' width='75%' mb='5' />
            <Skeleton h='3' width='95%' mb='5' />
            <Flex justifyContent={'space-between'}>
              <Skeleton h='3' width='50%' /> <Skeleton h='3' width='5%' />
            </Flex>
          </Box>

          {[1, 2, 3].map((each, i) => {
            return (
              <Box mb='3' key={i}>
                <Skeleton h='3' width='75%' mb='5' />
                {[1, 2, 3, 4, 5].map((each, i) => {
                  return (
                    <Flex justifyContent={'space-between'} key={i} mb='5'>
                      <Skeleton h='3' width='50%' />{' '}
                      <Skeleton h='3' width='5%' />
                    </Flex>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box>
          <Box maxW={'50%'}>
            <Text fontSize={'smSubHead'} mb='5'>
              Notifications
            </Text>
            <Text fontSize={'subHead'}>
              Manage your Clique notifications here
            </Text>
            <SimpleSwitch
              text='All Notifications'
              onChange={handleChange}
              isChecked={state.allNotifications}
              name='allNotifications'
            />
            <Text fontSize={'subHead'} mt='7'>
              CONTENT
            </Text>
            <SimpleSwitch
              text='Likes my post'
              isChecked={state.likeMyPost}
              name='likeMyPost'
              onChange={handleChange}
            />
            <SimpleSwitch
              text='Comment on my post'
              isChecked={state.commentOnMyPost}
              name='commentOnMyPost'
              onChange={handleChange}
            />
            <SimpleSwitch
              text='Likes my comment'
              isChecked={state.likeMyComment}
              name='likeMyComment'
              onChange={handleChange}
            />
            <SimpleSwitch
              text='Mentions me'
              isChecked={state.mentionMe}
              name='mentionMe'
              onChange={handleChange}
            />
            <Text fontSize={'subHead'} mt='7'>
              GENERAL
            </Text>
            <SimpleSwitch
              text='New subscriber'
              isChecked={state.newSubcriber}
              name='newSubcriber'
              onChange={handleChange}
            />
            <SimpleSwitch
              text='Receive payment'
              isChecked={state.receivePayment}
              name='receivePayment'
              onChange={handleChange}
            />
            <SimpleSwitch
              text='Wallet credits'
              isChecked={state.walletCredits}
              name='walletCredits'
              onChange={handleChange}
            />
            <SimpleSwitch
              text='Wallet debits'
              isChecked={state.walletsDebits}
              name='walletsDebits'
              onChange={handleChange}
            />
            <SimpleSwitch
              text='Live stream started'
              isChecked={state.liveStreamStarted}
              name='liveStreamStarted'
              onChange={handleChange}
            />
          </Box>
          <Divider my='7'></Divider>

          <Box maxW={'50%'}>
            <Text fontSize={'smSubHead'}>Theme</Text>
            <SimpleSwitch
              text='Light/Dark mode'
              isChecked={state.lightOrDark}
              name='lightOrDark'
              onChange={handleChange}
            />
          </Box>
          <Divider my='7'></Divider>

          <Box maxW={'50%'}>
            <Text fontSize={'smSubHead'} mb='5'>
              Referral
            </Text>
            <Text fontSize={'subHead'} mb='6'>
              Refer a friend and earn{' '}
              <span style={{color: '#8758FF'}}>#1000!</span>
            </Text>
            <Text color='clique.text' fontSize={'xsl'}>
              Referral Code
            </Text>
            <Flex justifyContent='space-between' mt='2'>
              <Text fontSize={'smSubHead'}>{userProfile?.referralCode}</Text>
              <TbCopy
                fontSize={'20'}
                color='#8758FF'
                onClick={() => onClick('D657Y85')}
                cursor='pointer'
              />
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Notification;
