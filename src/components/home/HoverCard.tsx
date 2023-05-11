import moment from 'moment';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {useAppSelector} from 'redux/app/hooks';
import {useSubscribeMutation} from 'redux/services/user.service';

import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import Color from '@constants/color';

import {contentData} from '../../constants/utils';
import {useRoutingChannel} from '../../hooks/useRoutingChannel';
import SmallPlayer from './SmallPlayer';
import SubScribeModal from './SubScribeModal';

function HoverCard({
  setIsHover,
  isSubscribed,
  id,
  video,
  name,
  userId,
  photo,
  url,
  show,
}: {
  setIsHover: any;
  isSubscribed: boolean;
  id: string;
  userId: string;
  video: contentData;
  name: string;
  photo: string;
  url: string;
  show: boolean;
}) {
  const router = useRouter();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const {isOpen, onOpen, onClose} = useDisclosure();
  // const [subscribe, subscribeStatus] = useSubscribeMutation();
  const {handleRouting} = useRoutingChannel();

  useEffect(() => {
    if (!userProfile?._id) {
      window.location.replace('/login');
    }
  }, [userProfile?._id, router]);

  return (
    <Box
      onMouseLeave={() => setIsHover(false)}
      position={'absolute'}
      cursor={'pointer'}
      rounded='10px'
      overflow={'hidden'}
      zIndex={100}
      // bg={useColorModeValue("clique.white", "clique.secondaryGrey1")}
      w='100%'
      display={show ? 'block' : 'none'}
    >
      <Box
        onClick={() => {
          if (isSubscribed) {
            router.push(`/player/${id}/${userId}`);
          } else {
            onOpen();
          }
        }}
      >
        <SmallPlayer url={url} video={video} />
      </Box>
      <Flex mt='15px'>
        <Avatar
          mr={'10px'}
          p='0'
          size='sm'
          name={video?.channel_id?.name ?? 'Not Available'}
          src={video?.channel_id?.photo}
          onClick={() => handleRouting(video?.channel_id?.name)}
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
            {video?.title}
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
            @{video?.channel_id?.name ?? 'Not Available'}
          </Text>
          <Flex alignItems={'center'} mt='5px'>
            <Text
              noOfLines={2}
              color={'clique.darkGrey'}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize={'sm'}
              lineHeight={'1.2'}
              mr='10px'
            >
              {video?.view} {video?.view !== 1 ? 'views' : 'view'}
            </Text>
            <Text
              pos={'relative'}
              _before={{
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: 0,
                width: '4px',
                background: 'clique.darkGrey',
                height: '4px',
                rounded: 'full',
              }}
              pl='10px'
              noOfLines={2}
              color={'clique.darkGrey'}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize={'sm'}
              lineHeight={'1.2'}
            >
              {moment(video?.createdAt).fromNow()}
            </Text>
          </Flex>
        </Box>
        <Flex p='2px' borderRadius={'5px'} h='100%'>
          {/* <Icon
            as={VideoSideIcon}
            fontSize="25px"
            cursor="pointer"
            onClick={() => {
              if (isSubscribed) {
                setShow(!show);
              } else {
                // this is the error line
                onOpen();
              }
            }}
          /> */}
        </Flex>
      </Flex>
      <SubScribeModal
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
        id={video?.channel_id?.name}
        userName={video?.uploader_id?.userName}
      />
    </Box>
  );
}

export default HoverCard;
