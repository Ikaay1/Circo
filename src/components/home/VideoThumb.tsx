import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';

import {
	Avatar,
	Box,
	Fade,
	Flex,
	ScaleFade,
	Text,
	useDisclosure,
} from '@chakra-ui/react';

import { useRoutingChannel } from '../../../custumHooks/useRoutingChannel';
import { contentData } from '../../constants/utils';
import HoverCard from './HoverCard';
import SubScribeModal from './SubScribeModal';

function VideoThumb({
  video,
  thumbWidth,
  isSubscribed,
  lastElementRef,
}: {
  video: contentData;
  thumbWidth: {base: string; lg: string; mlg: string; xl: string};
  isSubscribed: boolean;
  lastElementRef?: any;
}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isHover, setIsHover] = React.useState(false);
  const {handleRouting} = useRoutingChannel();
  const router = useRouter();
  return (
    <Box position={'relative'} ref={lastElementRef}>
      {isHover ? (
        <ScaleFade reverse unmountOnExit in={isHover}>
          <HoverCard
            setIsHover={setIsHover}
            isSubscribed={isSubscribed}
            id={video._id}
            video={video}
          />
        </ScaleFade>
      ) : (
        <Box>
          <Box
            onMouseEnter={() => setIsHover(true)}
            cursor={'pointer'}
            w='full'
            onClick={() => {
              if (isSubscribed) {
                router.push(`/player/${video._id}`);
              } else {
                onOpen();
              }
            }}
          >
            <SubScribeModal
              onClose={onClose}
              isOpen={isOpen}
              onOpen={onOpen}
              id={video?.uploader_id?._id}
            />
            <Box
              h={{lg: '130px', mlg: '180px'}}
              bgImage={`url(${video?.thumbNail})`}
              bgSize='cover'
              bgPosition='center'
              rounded={'10px'}
            />
          </Box>

          <Flex mt='15px'>
            {video?.uploader_id?.photo ? (
              <Avatar
                mr={'10px'}
                p='0'
                size='sm'
                name='Prosper Otemuyiwa'
                src={video?.uploader_id?.photo}
                onClick={() => handleRouting(video?.uploader_id?._id)}
                cursor='pointer'
              />
            ) : (
              <Avatar
                size='sm'
                name={
                  video?.uploader_id?.firstName +
                  ' ' +
                  video?.uploader_id?.lastName
                }
                borderColor='clique.greenYellow'
                onClick={() => handleRouting(video?.uploader_id?._id)}
                cursor='pointer'
                mr={'10px'}
                p='0'
              />
            )}
            <Box w='calc(100% - 40px)'>
              <Text
                noOfLines={1}
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'16px'}
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
                fontSize={'14px'}
                lineHeight={'1.2'}
              >
                @{video?.uploader_id?.userName}
              </Text>
              <Flex alignItems={'center'} mt='5px'>
                <Text
                  noOfLines={2}
                  color={'clique.darkGrey'}
                  fontFamily={'Poppins'}
                  fontWeight={400}
                  fontSize={'14px'}
                  lineHeight={'1.2'}
                  mr='10px'
                >
                  {video?.view} views
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
                  fontSize={'14px'}
                  lineHeight={'1.2'}
                >
                  {moment(video?.createdAt).fromNow()}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
}

export default VideoThumb;
