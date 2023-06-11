import moment from 'moment';
import {useRouter} from 'next/router';
import React from 'react';
import {useAppSelector} from 'redux/app/hooks';

import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import SubScribeModal from '@components/home/SubScribeModal';
import AvataWithSpace from '@components/widgets/AvataWithSpace';
import Color from '@constants/color';

import {contentData} from '../../constants/utils';
import Thumbnail from './Thumbnail';

function TrendCard({position, video}: {position: string; video: contentData}) {
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();

  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const {userProfile} = useAppSelector((store) => store.app.userReducer);

  React.useEffect(() => {
    // video.uploader_id?._id === userProfile?._id || video?.isFree
    //   ? true
    //   : video?.uploader_id?.subscribers?.find(
    //       (theId) => theId === userProfile?._id
    //     )
    //   ? true
    //   : false;
    if (video?.uploader_id?._id === userProfile?._id || video?.isFree) {
      setIsSubscribed(true);
    } else {
      if (
        video?.uploader_id?.subscribers?.find(
          (theId) => theId === userProfile?._id,
        )
      ) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    }
  }, [video]);
  return (
    <Box
      onClick={() => {
        if (isSubscribed) {
          router.push('/player/' + video._id + '/' + video.uploader_id._id);
        } else {
          onOpen();
        }
      }}
      cursor={'pointer'}
      position={'relative'}
      _before={{
        content: `"${position}"`,
        position: 'absolute',
        fontSize: 'big',
        left: '-20px',
        top: '-35px',
        color: 'clique.base',
        fontWeight: 500,
      }}
      alignItems={'center'}
      justifyContent={'center'}
      gap={{lg: '0 1.5rem', xl: '0 4rem'}}
      rounded={'20px'}
      px='30px'
      py='20px'
      mt='30px'
      h={{lg: '200px', xl: '220px'}}
      bg='clique.white'
      display={{base: 'block', lg: 'flex'}}
    >
      <Box
        width={{base: '100%', lg: '220px', xl: '300px'}}
        h={{base: '200px', lg: '130px', mlg: '180px'}}
      >
        <Thumbnail video={video} />
      </Box>
      <SubScribeModal
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
        id={video?.channel_id?.name}
        userName={video?.uploader_id?.userName}
      />
      <Box w={{lg: '190px', xl: '289px'}} mt={{base: '.6rem', lg: 0}}>
        <Flex>
          {video?.channel_id?.photo ? (
            <AvataWithSpace
              onClick={(e: any) => {
                e.stopPropagation();
                router.push(`/channel/${video.channel_id.name}`);
              }}
              mr='10px'
              name='Prosper Otemuyiwa'
              url={video?.channel_id.photo}
              size='45px'
              borderColor='clique.brown'
              borderThickness='3px'
            />
          ) : (
            <Avatar
              size='md'
              onClick={(e: any) => {
                e.stopPropagation();
                router.push(`/channel/${video.channel_id.name}`);
              }}
              name={
                video.uploader_id.firstName + ' ' + video.uploader_id.lastName
              }
              mr='10px'
              borderColor='clique.greenYellow'
            />
          )}

          <Box>
            <Text
              fontFamily={'Poppins'}
              fontSize='smSubHead'
              color={'clique.lightGrey'}
              noOfLines={1}
            >
              {video?.channel_id?.name}
            </Text>
            <Flex mt='5px' alignItems={'center'}>
              <Text
                noOfLines={1}
                color={'clique.lightGrey'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={{lg: 'sm3', xl: 'smSubHead'}}
                lineHeight={'1.2'}
                mr='10px'
              >
                {video.view} {video.view !== 1 ? 'views' : 'view'}
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
                  background: 'clique.lightGrey',
                  height: '4px',
                  rounded: 'full',
                }}
                pl='10px'
                noOfLines={1}
                color={'clique.lightGrey'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={{lg: 'sm3', xl: 'smSubHead'}}
                lineHeight={'1.2'}
              >
                {moment(
                  video?.uploadTime ? video?.uploadTime : video?.createdAt,
                ).fromNow()}
              </Text>
            </Flex>
          </Box>
        </Flex>

        <Text
          mt='5px'
          color='clique.black'
          fontFamily={'Poppins'}
          fontWeight={700}
          textTransform={'capitalize'}
          fontSize={{lg: 'smHead', xl: 'head'}}
          noOfLines={1}
        >
          {video.title}
        </Text>

        <Text
          fontFamily={'Poppins'}
          fontSize={{lg: 'sm4', xl: 'smSubHead'}}
          color={'clique.lightGrey'}
          noOfLines={3}
        >
          {video.description}
        </Text>
      </Box>
    </Box>
  );
}

export default TrendCard;
