import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {TbCopy} from 'react-icons/tb';
import {useAppSelector} from 'redux/app/hooks';
import {useUpdatePreferenceMutation} from 'redux/services/settings.service';

import {
  Box,
  Divider,
  Flex,
  Skeleton,
  Text,
  useColorMode,
} from '@chakra-ui/react';

import SimpleSwitch from './SimpleSwitch';

type Props = {
  onClick: (code: string) => void;
  data: Notification;
  isLoading: boolean;
  isFetching: boolean;
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

const Notification = ({
  isLoading,
  data,
  onClick,
  isFetching,
  setValue,
}: any) => {
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const [updatePreference, info] = useUpdatePreferenceMutation();
  const [state, setState] = useState({
    allNotifications:
      data &&
      data?.likeMyPost === true &&
      data?.commentOnMyPost === true &&
      data?.likeMyComment === true &&
      data?.mentionMe === true &&
      data?.newSubcriber === true &&
      data?.receivePayment === true &&
      data?.walletCredits === true &&
      data?.walletsDebits === true &&
      data?.liveStreamStarted === true
        ? true
        : false,
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
  const router = useRouter();

  useEffect(() => {
    setValue(userProfile?.referralCode);
  }, [userProfile?.referralCode]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({...prev, [e.target.name]: e.target.checked}));
    if (e.target.name === 'allNotifications') {
      if (e.target.checked) {
        const apiState: Notification = {...defaultState};
        delete apiState.allNotifications;
        setState(defaultState);
        await updatePreference(apiState);
      } else {
        const apiState: any = {...defaultState};
        delete apiState.allNotifications;
        Object.keys(apiState).forEach((key) => {
          apiState[key] = false;
        });
        setState(apiState);
        await updatePreference(apiState);
      }
    } else {
      if (e.target.checked === false) {
        setState((prev) => ({...prev, allNotifications: false}));
      } else if (
        state.likeMyPost &&
        state.commentOnMyPost &&
        state.likeMyComment &&
        state.mentionMe &&
        state.newSubcriber &&
        state.receivePayment &&
        state.walletCredits &&
        state.walletsDebits &&
        state.liveStreamStarted
      ) {
        setState((prev) => ({...prev, allNotifications: true}));
      } else {
        setState((prev) => ({...prev, allNotifications: false}));
      }

      await updatePreference({[e.target.name]: e.target.checked});
    }
  };

  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <>
      {isLoading ? (
        <Box maxW={{base: '100%', lg: '50%'}}>
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
          <Box maxW={{base: '100%', lg: '50%'}}>
            <Text fontSize={'smSubHead'} mb='5'>
              Notifications
            </Text>
            <Text fontSize={'subHead'}>
              Manage your Circo notifications here
            </Text>
            <SimpleSwitch
              isFetching={isFetching}
              isUpdating={info.isLoading}
              text='All Notifications'
              onChange={handleChange}
              isChecked={state.allNotifications}
              name='allNotifications'
            />
            <Text fontSize={'subHead'} mt='7'>
              CONTENT
            </Text>
            <SimpleSwitch
              isFetching={isFetching}
              isUpdating={info.isLoading}
              text='Likes my post'
              isChecked={state.likeMyPost}
              name='likeMyPost'
              onChange={handleChange}
            />
            <SimpleSwitch
              isFetching={isFetching}
              isUpdating={info.isLoading}
              text='Comment on my post'
              isChecked={state.commentOnMyPost}
              name='commentOnMyPost'
              onChange={handleChange}
            />
            <SimpleSwitch
              isFetching={isFetching}
              isUpdating={info.isLoading}
              text='Likes my comment'
              isChecked={state.likeMyComment}
              name='likeMyComment'
              onChange={handleChange}
            />
            <SimpleSwitch
              isFetching={isFetching}
              isUpdating={info.isLoading}
              text='Mentions me'
              isChecked={state.mentionMe}
              name='mentionMe'
              onChange={handleChange}
            />
            <Text fontSize={'subHead'} mt='7'>
              GENERAL
            </Text>
            <SimpleSwitch
              isFetching={isFetching}
              isUpdating={info.isLoading}
              text='New subscriber'
              isChecked={state.newSubcriber}
              name='newSubcriber'
              onChange={handleChange}
            />
            <SimpleSwitch
              isFetching={isFetching}
              isUpdating={info.isLoading}
              text='Receive payment'
              isChecked={state.receivePayment}
              name='receivePayment'
              onChange={handleChange}
            />
            <SimpleSwitch
              isFetching={isFetching}
              isUpdating={info.isLoading}
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
              isFetching={isFetching}
              isUpdating={info.isLoading}
            />
            <SimpleSwitch
              text='Live stream started'
              isChecked={state.liveStreamStarted}
              name='liveStreamStarted'
              isFetching={isFetching}
              isUpdating={info.isLoading}
              onChange={handleChange}
            />
          </Box>
          <Divider my='7'></Divider>

          <Box maxW={'50%'}>
            <Text fontSize={'smSubHead'}>Theme</Text>
            <SimpleSwitch
              text='Light/Dark mode'
              isChecked={colorMode === 'light' ? true : false}
              name='lightOrDark'
              onChange={toggleColorMode}
            />
          </Box>
          <Divider my='7'></Divider>

          <Box maxW={{base: '100%', lg: '50%'}}>
            <Text fontSize={'smSubHead'} mb='5'>
              Referral
            </Text>
            <Text fontSize={'subHead'} mb='6'>
              Refer a friend and earn{' '}
              <span style={{color: '#8758FF'}}>₦1000!</span>
            </Text>
            <Text color='clique.text' fontSize={'xsl'}>
              Referral Code
            </Text>
            <Flex justifyContent='space-between' mt='2'>
              <Text fontSize={'smSubHead'}>{userProfile?.referralCode}</Text>
              <TbCopy
                fontSize={'20'}
                color='#8758FF'
                onClick={() => onClick(userProfile?.referralCode)}
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
