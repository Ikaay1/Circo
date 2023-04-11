import moment from 'moment';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {BiDislike, BiLike} from 'react-icons/bi';
import {BsFillPlayFill, BsFullscreen, BsPauseFill} from 'react-icons/bs';
import {GoMute, GoUnmute} from 'react-icons/go';
import {MdFullscreenExit} from 'react-icons/md';
import {useAppSelector} from 'redux/app/hooks';
import {
  useDislikeContentMutation,
  useLikeContentMutation,
} from 'redux/services/content.service';

import {Box, Flex, Grid, GridItem, Icon, Spinner, Text} from '@chakra-ui/react';
import NextIcon from '@icons/NextIcon';
import PrevIcon from '@icons/PrevIcon';

import GiftModal from './GiftModal';
import VideoOptionMenu from './VideoOptionMenu';

function ControlMobile({
  currentTimestamp,
  totalDuration,
  isMuted,
  isPlay,
  isFullScreen,
  setIsFullScreen,
  setIsMuted,
  setIsPlay,
  playerRef,
  video,
  nextVideoIndex,
  prevVideoIndex,
  videoIdsList,
  currentVideoIndex,
  isLoop,
  setIsLoop,
  Bref,
}: any) {
  const router = useRouter();
  const [like, likeInfo] = useLikeContentMutation();
  const [dislike, dislikeInfo] = useDislikeContentMutation();
  const handleLike = async () => {
    await like({video_id: video._id});
  };

  const handleDislike = async () => {
    await dislike({video_id: video._id});
  };

  const {userProfile} = useAppSelector((store) => store.app.userReducer);

  useEffect(() => {
    if (!userProfile?._id) {
      window.location.replace('/login');
    }
  }, [userProfile?._id, router]);

  return (
    <Flex
      // templateColumns='repeat(7, 1fr)'
      mt='30px'
      justifyContent={'space-between'}
      alignItems='center'
      px='6px'
    >
      <GridItem flex='1'>
        <Flex alignItems='center' mr='3px' ml={'3px'}>
          {!currentTimestamp || !totalDuration ? (
            <Text
              w='12px'
              color={'clique.white'}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize={'smSubHead'}
              lineHeight={'1'}
            ></Text>
          ) : (
            <Text
              color={'clique.white'}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize={'smSubHead'}
              lineHeight={'1'}
            >
              {moment(currentTimestamp * 1000).format('mm:ss')} <br />/{' '}
              {moment(totalDuration * 1000).format('mm:ss')}
            </Text>
          )}
          {!isMuted ? (
            <Icon
              fontSize='smHead'
              cursor={'pointer'}
              color={'clique.white'}
              onClick={() => setIsMuted(!isMuted)}
              as={GoUnmute}
              mx='10px'
            />
          ) : (
            <Icon
              fontSize='smHead'
              cursor={'pointer'}
              color={'clique.white'}
              onClick={() => setIsMuted(!isMuted)}
              as={GoMute}
              mx='10px'
            />
          )}{' '}
          <Flex alignItems='center'>
            <Flex alignItems={'center'} flexDirection={'column'} mx={'3px'}>
              {likeInfo.isLoading ? (
                <Spinner size={'sm'} bg='clique.base' />
              ) : (
                <Box onClick={handleLike}>
                  <Icon
                    color={
                      video.likes.includes(userProfile?._id)
                        ? 'clique.base'
                        : 'clique.white'
                    }
                    fontSize='head'
                    as={BiLike}
                  />
                </Box>
              )}
              <Text
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'smSubHead'}
                lineHeight={'1.2'}
              >
                {video.likesCount}
              </Text>
            </Flex>

            <Flex alignItems={'center'} flexDirection={'column'}>
              {dislikeInfo.isLoading ? (
                <Spinner size={'sm'} bg='clique.base' />
              ) : (
                <Box onClick={handleDislike}>
                  <Icon
                    color={
                      video.dislikes.includes(userProfile?._id)
                        ? 'clique.base'
                        : 'clique.white'
                    }
                    fontSize=' head'
                    as={BiDislike}
                  />
                </Box>
              )}
              <Text
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'smSubHead'}
                lineHeight={'1.2'}
              >
                {video.dislikesCount}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem justifySelf='center' mr='.7rem' flex='1'>
        <Flex alignItems='center' justifyContent={'flex-end'}>
          <Icon
            fontSize='bigHead'
            cursor='pointer'
            as={PrevIcon}
            color={prevVideoIndex !== null ? 'clique.white' : 'gray.500'}
            onClick={() => {
              if (prevVideoIndex !== null) {
                router.push(
                  `/player/${videoIdsList[prevVideoIndex]?._id}/${video.uploader_id._id}`,
                );
              }
            }}
          />

          {!isPlay ? (
            <Icon
              fontSize='35px'
              cursor='pointer'
              color={'clique.white'}
              as={BsPauseFill}
              onClick={
                playerRef.current
                  ? () => {
                      playerRef.current.pause();
                      setIsPlay(false);
                    }
                  : () => setIsPlay(!isPlay)
              }
            />
          ) : (
            <Icon
              fontSize='bigHead'
              cursor='pointer'
              color={'clique.white'}
              as={BsFillPlayFill}
              onClick={
                playerRef.current
                  ? () => {
                      playerRef.current.play();
                      setIsPlay(true);
                    }
                  : () => setIsPlay(!isPlay)
              }
            />
          )}
          <Icon
            fontSize='30px'
            cursor='pointer'
            as={NextIcon}
            color={nextVideoIndex !== null ? 'clique.white' : 'gray.500'}
            onClick={() => {
              if (nextVideoIndex !== null) {
                router.push(
                  `/player/${videoIdsList[nextVideoIndex]?._id}/${video.uploader_id._id}`,
                );
              }
            }}
          />
        </Flex>
      </GridItem>
      <GridItem flex='1' justifySelf='end'>
        <Flex alignItems='center' justifyContent={'flex-end'}>
          {video.uploader_id._id !== userProfile._id && (
            <GiftModal isFullScreen={isFullScreen} video={video} Bref={Bref} />
          )}
          <VideoOptionMenu
            isLoop={isLoop}
            setIsLoop={setIsLoop}
            player={playerRef}
            video={video}
          />
          {!isFullScreen ? (
            <Icon
              fontSize='smHead'
              cursor={'pointer'}
              onClick={() => {
                setIsFullScreen(!isFullScreen);
                const video: any = document.getElementById('video');
                video.requestFullscreen();
              }}
              color={'clique.white'}
              as={BsFullscreen}
            />
          ) : (
            <Icon
              fontSize='smHead'
              cursor={'pointer'}
              onClick={() => {
                setIsFullScreen(!isFullScreen);
                document.exitFullscreen();
              }}
              color={'clique.white'}
              as={MdFullscreenExit}
            />
          )}
        </Flex>
      </GridItem>
    </Flex>
  );
}

export default ControlMobile;
