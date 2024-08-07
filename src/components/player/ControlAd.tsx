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
import VideoOptionMenuAd from './VideoOptionMenuAd';

function ControlAd({
  play,
  videoHandler,
  setIsMuted,
  isMuted,
  nextVideoIndex,
  prevVideoIndex,
  videoIdsList,
  video,
  currentTimestamp,
  totalDuration,
  isFullScreen,
  setIsFullScreen,
  isLoop,
  setIsLoop,
  Bref,
  videoRef,
}: any) {
  const router = useRouter();
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const [like, likeInfo] = useLikeContentMutation();
  const [dislike, dislikeInfo] = useDislikeContentMutation();
  const handleLike = async () => {
    await like({video_id: video._id});
  };

  const handleDislike = async () => {
    await dislike({video_id: video._id});
  };

  useEffect(() => {
    if (!userProfile?._id) {
      window.location.replace('/login');
    }
  }, [userProfile?._id, router]);
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
          <Flex
            alignSelf={'center'}
            alignItems='center'
            pos='relative'
            h='70px'
          >
            {!currentTimestamp || !totalDuration ? (
              <Text
                mt='5px'
                minW={'100px'}
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'smSubHead'}
                lineHeight={'1'}
                mr='22px'
                ml='10px'
              ></Text>
            ) : (
              <Text
                mt='5px'
                minW={'100px'}
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'smSubHead'}
                lineHeight={'1'}
                mr='22px'
                ml='10px'
              >
                {moment(currentTimestamp * 1000).format('mm:ss')} /{' '}
                {moment(totalDuration * 1000).format('mm:ss')}
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

              {/* <Flex
                minW='40px'
                flexDir='column'
                justify={'center'}
                cursor={'pointer'}
                mx='10px'
                alignItems={'center'}
              >
                {dislikeInfo.isLoading ? (
                  <Spinner size={'sm'} mr='5px' bg='clique.base' />
                ) : (
                  <Box onClick={handleDislike}>
                    <Tooltip
                      portalProps={{containerRef: Bref}}
                      label='Dislike'
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
                            video.dislikes.includes(userProfile?._id)
                              ? 'clique.base'
                              : 'clique.white'
                          }
                          mr='5px'
                          fontSize=' head'
                          as={BiDislike}
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
                  {video.dislikesCount}
                </Text>
              </Flex> */}
            </Flex>
          </Flex>
        </GridItem>
        <GridItem
          colSpan={3}
          justifySelf={'center'}
          alignSelf='center'
          h='70px'
          p='0'
          m='0'
        >
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
              </span>
            </Tooltip>

            {play === true ? (
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
                    minW='35px'
                    w='35px'
                    maxW='35px'
                    color={'clique.white'}
                    onClick={() => videoHandler('pause')}
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
                    fontSize='bigHead'
                    cursor='pointer'
                    as={BsFillPlayFill}
                    minW='35px'
                    w='35px'
                    maxW='35px'
                    onClick={() => videoHandler('play')}
                    color={'clique.white'}
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
            {video.uploader_id._id !== userProfile?._id && !isFullScreen && (
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
                    <VideoOptionMenuAd
                      isLoop={isLoop}
                      setIsLoop={setIsLoop}
                      player={videoRef}
                      video={video}
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
                      const video: any = document.getElementById('video2');
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
                label='Normal'
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

export default ControlAd;
