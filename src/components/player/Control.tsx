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
import Player from 'video.js/dist/types/player';

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import NextIcon from '@icons/NextIcon';
import PrevIcon from '@icons/PrevIcon';

import GiftModal from './GiftModal';
import VideoOptionMenu from './VideoOptionMenu';

function Control({
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
  timeAsAtUrlChange,
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
  const {token} = useAppSelector((store) => store.app.userReducer);
  const qualityFunc = (time) => {
    if (playerRef.current && playerRef.current.seek) {
      setTimeout(() => {
        playerRef.current.seek(time);
      }, 500);
    }
  };
  return (
    <Box h='100%' mt='5px'>
      <Grid
        templateColumns='repeat(7, 1fr)'
        px='30px'
        pt='5px'
        minH='70px'
        maxH='70px'
        alignItems={'center'}
        justifyItems={'center'}
      >
        <GridItem colSpan={2} h='70px'>
          <Flex alignItems='center' h='100%' pos='relative'>
            {!currentTimestamp || !totalDuration ? (
              <Text
                minW={'100px'}
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'smSubHead'}
                mr='30px'
              ></Text>
            ) : (
              <Text
                minW={'100px'}
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'smSubHead'}
                mr='30px'
              >
                {moment
                  .utc(currentTimestamp * 1000)
                  .format(currentTimestamp < 3600 ? 'mm:ss' : 'HH:mm:ss')}{' '}
                /{' '}
                {moment
                  .utc(totalDuration * 1000)
                  .format(totalDuration < 3600 ? 'mm:ss' : 'HH:mm:ss')}
              </Text>
            )}
            {!isMuted ? (
              <Tooltip
                portalProps={{containerRef: Bref}}
                label='Mute'
                bg='none'
                hasArrow
                color='clique.white'
                fontSize='sm'
                p='0'
                mt='0'
                placement='top'
              >
                <span>
                  <Icon
                    fontSize='smHead'
                    cursor={'pointer'}
                    onClick={() => setIsMuted(!isMuted)}
                    as={GoUnmute}
                    color={'clique.white'}
                  />
                </span>
              </Tooltip>
            ) : (
              <Tooltip
                portalProps={{containerRef: Bref}}
                label='Unmute'
                bg='none'
                hasArrow
                color='clique.white'
                fontSize='sm'
                p='0'
                mt='0'
                placement='top'
              >
                <span>
                  <Icon
                    fontSize='smHead'
                    cursor={'pointer'}
                    onClick={() => setIsMuted(!isMuted)}
                    as={GoMute}
                    color={'clique.white'}
                  />
                </span>
              </Tooltip>
            )}
            <Flex ml='30px' alignItems={'center'}>
              <Flex
                minW='40px'
                flexDir='column'
                justify={'center'}
                cursor={'pointer'}
                alignItems={'center'}
              >
                {likeInfo.isLoading ? (
                  <Spinner size={'sm'} bg='clique.base' />
                ) : (
                  <Box onClick={handleLike}>
                    <Tooltip
                      portalProps={{containerRef: Bref}}
                      label='Like'
                      bg='none'
                      hasArrow
                      color='clique.white'
                      fontSize='sm'
                      p='0'
                      mt='0'
                      placement='top'
                    >
                      <span>
                        <Icon
                          color={
                            video.likes.includes(userProfile?._id)
                              ? 'clique.base'
                              : 'clique.white'
                          }
                          fontSize='head'
                          as={BiLike}
                        />
                      </span>
                    </Tooltip>
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
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={3} justifySelf='center' h='70px' p='0' m='0'>
          <Flex alignItems='center' h='100%'>
            <Tooltip
              portalProps={{containerRef: Bref}}
              label='Previous'
              bg='none'
              hasArrow
              color='clique.white'
              fontSize='sm'
              p='0'
              mt='0'
              placement='top'
            >
              <span>
                <Icon
                  fontSize='bigHead'
                  m='0'
                  cursor='pointer'
                  as={PrevIcon}
                  color={prevVideoIndex !== null ? 'clique.white' : 'gray.500'}
                  onClick={() => {
                    if (!token) {
                      return;
                    }
                    if (prevVideoIndex !== null) {
                      router.push(
                        `/player/${videoIdsList[prevVideoIndex]?._id}/${video.uploader_id._id}`,
                      );
                    }
                  }}
                />
              </span>
            </Tooltip>

            {!isPlay ? (
              <Tooltip
                portalProps={{containerRef: Bref}}
                label='Pause'
                bg='none'
                hasArrow
                color='clique.white'
                fontSize='sm'
                p='0'
                mt='0'
                placement='top'
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    fontSize='35px'
                    cursor='pointer'
                    as={BsPauseFill}
                    m='0'
                    minW='35px'
                    w='35px'
                    maxW='35px'
                    color={'clique.white'}
                    onClick={
                      playerRef.current
                        ? () => {
                            playerRef.current.pause();
                            setIsPlay(false);
                          }
                        : () => setIsPlay(!isPlay)
                    }
                    mx='20px'
                  />
                </span>
              </Tooltip>
            ) : (
              <Tooltip
                portalProps={{containerRef: Bref}}
                label='Play'
                bg='none'
                hasArrow
                color='clique.white'
                fontSize='sm'
                p='0'
                mt='0'
                placement='top'
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    m='0'
                    fontSize='bigHead'
                    cursor='pointer'
                    as={BsFillPlayFill}
                    minW='35px'
                    w='35px'
                    maxW='35px'
                    color={'clique.white'}
                    onClick={
                      playerRef.current
                        ? () => {
                            playerRef.current.play();
                            setIsPlay(true);
                          }
                        : () => setIsPlay(!isPlay)
                    }
                    mx='20px'
                  />
                </span>
              </Tooltip>
            )}
            <Tooltip
              portalProps={{containerRef: Bref}}
              label='Next'
              bg='none'
              hasArrow
              color='clique.white'
              fontSize='sm'
              p='0'
              mt='0'
              placement='top'
            >
              <span>
                <Icon
                  fontSize='30px'
                  cursor='pointer'
                  as={NextIcon}
                  color={nextVideoIndex !== null ? 'clique.white' : 'gray.500'}
                  onClick={() => {
                    if (!token) {
                      return;
                    }
                    if (nextVideoIndex !== null) {
                      router.push(
                        `/player/${videoIdsList[nextVideoIndex]?._id}/${video.uploader_id._id}`,
                      );
                    }
                  }}
                />
              </span>
            </Tooltip>
          </Flex>
        </GridItem>
        <GridItem colSpan={2} justifySelf='end' h='70px' alignItems='center'>
          <Flex alignItems='center' h='100%'>
            {token &&
              video.uploader_id._id !== userProfile._id &&
              !isFullScreen && (
                <GiftModal
                  isFullScreen={isFullScreen}
                  video={video}
                  Bref={Bref}
                />
              )}
            {!isFullScreen && (
              <Flex mx={{base: '10px', lg: '30px'}}>
                <Tooltip
                  portalProps={{containerRef: Bref}}
                  label='Settings'
                  bg='none'
                  hasArrow
                  color='clique.white'
                  fontSize='sm'
                  p='0'
                  mt='0'
                  placement='top'
                >
                  <Flex alignItems='center'>
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
                  </Flex>
                </Tooltip>
              </Flex>
            )}
            {!isFullScreen ? (
              <Tooltip
                portalProps={{containerRef: Bref}}
                label='Fullscreen'
                bg='none'
                hasArrow
                color='clique.white'
                fontSize='sm'
                p='0'
                mt='0'
                placement='top'
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
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
                    as={BsFullscreen}
                    color={'clique.white'}
                  />
                </span>
              </Tooltip>
            ) : (
              <Tooltip
                portalProps={{containerRef: Bref}}
                label='Minimize'
                hasArrow
                color='clique.white'
                fontSize='sm'
                p='0'
                mt='0'
                pl='150px'
                textAlign='center'
                placement='top'
                bg='none'
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    fontSize='smHead'
                    cursor={'pointer'}
                    color={'clique.white'}
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
                    as={MdFullscreenExit}
                  />
                </span>
              </Tooltip>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Control;
