import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from 'redux/app/hooks';
import { useGetUserQuery } from 'redux/services/user.service';

import {
	Avatar,
	Box,
	Circle,
	Icon,
	Image,
	Modal,
	ModalContent,
	ModalOverlay,
	Skeleton,
	SkeletonCircle,
	Text,
	useDisclosure,
	WrapItem,
} from '@chakra-ui/react';
// import CreateChannelModal from "@components/createChannel/CreateChannelModal";
import Subscriptions from '@components/profile/Subscriptions';
import { scrollBarStyle } from '@constants/utils';
import EmptyProfile from '@icons/EmptyProfile';
import SideIcon from '@icons/SideIcon';

export type Channel = {
  bio: string;
  cover?: string;
  createdAt: string;
  isDisabled: boolean;
  name: string;
  subscriptionFee: number;
  subscriptionInfo: string;
  photo?: string;
  updatedAt: string;
  userId: string;
  visitors: Array<string>;
  _id: string;
};

const UserDetail = ({data, id}: {data?: Channel; id: string}) => {
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const router = useRouter();
  const {isLoading, data: userData} = useGetUserQuery(id);
  const des =
    router.query.name === 'content' ||
    router.query.name === 'analytics' ||
    router.pathname.includes('subscribe');
  const {isOpen, onOpen, onClose} = useDisclosure();

  const {
    isOpen: channelIsOpen,
    onOpen: channelOnOpen,
    onClose: channelOnClose,
  } = useDisclosure();

  useEffect(() => {
    if (!userProfile?._id) {
      router.push('/login');
    }
  }, [userProfile?._id, router]);

  return (
    <>
      <Box position='relative'>
        {!router.pathname.includes('profile') ? (
          data?.cover ? (
            <Image
              w='100%'
              h='170px'
              src={data?.cover}
              alt='cover photo'
              width='100%'
              objectFit='cover'
            />
          ) : (
            <Image
              objectFit='cover'
              w='100%'
              h='160px'
              src='/assets/channelEmpty.png'
              alt='empty state'
              width='100%'
            />
          )
        ) : userProfile?.cover ? (
          <Image
            w='100%'
            h='170px'
            src={userProfile?.cover}
            alt='cover photo'
            width='100%'
            objectFit='cover'
          />
        ) : (
          <Image
            objectFit='cover'
            w='100%'
            h='160px'
            src='/assets/channelEmpty.png'
            alt='empty state'
            width='100%'
          />
        )}

        <Box
          position={'absolute'}
          bottom={
            router.query.name === 'content' ||
            router.query.name === 'analytics' ||
            router.pathname.includes('subscribe')
              ? '-90%'
              : '-52%'
          }
          left={'50%'}
          transform='translateX(-50%)'
        >
          {!router.pathname.includes('profile') ? (
            <Box width='100%' mx='auto'>
              {data?.photo ? (
                <Image
                  src={data?.photo}
                  alt='profile photo'
                  borderRadius='50%'
                  objectFit={'cover'}
                  h='120px'
                  w='120px'
                  mx='auto'
                />
              ) : (
                <>
                  <Circle
                    size='120px'
                    bg='#232323'
                    color='white'
                    zIndex={'-1'}
                    mx='auto'
                  ></Circle>
                  <Box top='15%' left='17%' position={'absolute'}>
                    <Icon as={EmptyProfile} fontSize='81px' />
                    <Box
                      top='55%'
                      left='43%'
                      zIndex='1'
                      position={'absolute'}
                      cursor='pointer'
                    ></Box>
                  </Box>
                </>
              )}
            </Box>
          ) : userProfile?.photo ? (
            <Image
              src={userProfile?.photo}
              alt='profile photo'
              borderRadius='50%'
              objectFit={'cover'}
              h='120px'
              w='120px'
              mx='auto'
            />
          ) : !userData && isLoading ? (
            <Box mx='auto'>
              <SkeletonCircle size='10' h='120px' w='120px' />
            </Box>
          ) : (
            <WrapItem>
              <Avatar
                size='2xl'
                name={
                  userData?.data?.firstName + ' ' + userData?.data?.lastName
                }
                mx='auto'
              />
            </WrapItem>
          )}

          {/* name of content creator. Shows on both profile and channel routes but only in their content subroutes(and analytics subroute for channel) */}
          {des && (
            <Box>
              <Text
                fontWeight='600'
                fontSize='head'
                lineHeight='32px'
                color='clique.white'
                textAlign={'center'}
                mx='auto'
              >
                {data?.name}
              </Text>
              <Text
                fontSize='subHead'
                lineHeight='24px'
                color='clique.secondaryGrey2'
                textAlign={'center'}
              >
                {isLoading ? (
                  <Skeleton height='13px' maxW={'100px'} mx='auto' />
                ) : (
                  ` @${userData?.data?.userName}`
                )}
              </Text>
              <Text
                fontWeight='500'
                fontSize='subHead'
                lineHeight='24px'
                textDecorationLine='underline'
                color='clique.secondaryGrey2'
                textAlign={'center'}
                onClick={() => {
                  onOpen();
                }}
                cursor='pointer'
              >
                SUBSCRIPTIONS
              </Text>
            </Box>
          )}
        </Box>

        {router.pathname.includes('profile') ? (
          <Box position={'absolute'} right='10' bottom='-55'>
            {/* {data === null && (
              <Btn text="Create channel" mr="4" onClick={channelOnOpen} />
            )} */}

            <SideIcon />
          </Box>
        ) : null}
      </Box>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInRight'
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent
          maxW='400px'
          w='400px'
          bottom='0'
          minH='100vh'
          overflowY={'scroll'}
          sx={scrollBarStyle}
          m='0'
          py='30px'
          position={'absolute'}
          right={0}
          bg='clique.black'
        >
          <Subscriptions userData={userData} />
        </ModalContent>
      </Modal>
      {/* <CreateChannelModal
        onOpen={channelOnOpen}
        isOpen={channelIsOpen}
        onClose={channelOnClose}
      /> */}
    </>
  );
};

export default UserDetail;
