// @ts-nocheck
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
  setUrl,
  url,
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

  const qualityFunc = () => {};

  return (
    <Flex
      // templateColumns='repeat(7, 1fr)'
      mt={{base: '50px', lg: '30px'}}
      justifyContent={'space-between'}
      alignItems='center'
      px='6px'
      pb='.8rem'
      pr='10px'
    >
      <GridItem w='57%'>
        <Flex
          alignItems='center'
          justifyContent={'space-between'}
          mr='3px'
          ml={'3px'}
        >
          {!currentTimestamp || !totalDuration ? (
            <Text
              w='12px'
              color={'clique.white'}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize={'sm'}
              lineHeight={'1'}
            ></Text>
          ) : (
            <Text
              color={'clique.white'}
              fontFamily={'Poppins'}
              fontWeight={400}
              fontSize={'sm'}
              lineHeight={'1'}
            >
              {moment(currentTimestamp * 1000).format('mm:ss')}/{' '}
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
            <Flex
              alignItems={'center'}
              flexDirection={'column'}
              mx={'3px'}
              mr='15px'
            >
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

            {/* <Flex alignItems={'center'} flexDirection={'column'}>
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
            </Flex> */}
          </Flex>
        </Flex>
      </GridItem>
      <GridItem
        position='absolute'
        bottom='68px'
        // border='4px solid yellow'
        w='90vw'
        mx='auto'
        className='controlMobile'
        justifySelf='center'
        mr='.7rem'
        flex='1'
      >
        <Flex
          mx='auto'
          w='200px'
          alignItems='center'
          // border='4px solid yellow'
          justifyContent={'space-between'}
        >
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
      <GridItem w='38%' justifySelf='end'>
        <Flex
          alignItems='center'
          justifyContent={
            video.uploader_id._id !== userProfile._id && !isFullScreen
              ? 'space-between'
              : 'space-evenly'
          }
        >
          {video.uploader_id._id !== userProfile._id && !isFullScreen && (
            <GiftModal isFullScreen={isFullScreen} video={video} Bref={Bref} />
          )}
          <VideoOptionMenu
            isLoop={isLoop}
            setIsLoop={setIsLoop}
            player={playerRef}
            video={video}
            setUrl={setUrl}
            url={url}
            currentTimestamp={currentTimestamp}
            qualityFunc={qualityFunc}
          />
          {!isFullScreen ? (
            <Icon
              fontSize='smHead'
              cursor={'pointer'}
              onClick={() => {
                setIsFullScreen(!isFullScreen);
                const video: any = document.getElementById('video');
                if (video.requestFullscreen) {
                  video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                  /* Safari */
                  video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                  /* IE11 */
                  video.msRequestFullscreen();
                }
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
                if (document.exitFullscreen) {
                  document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                  /* Safari */
                  document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                  /* IE11 */
                  document.msExitFullscreen();
                }
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
