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
    <>
      <Grid
        alignItems='center'
        templateColumns='repeat(7, 1fr)'
        px='30px'
        py='25px'
        gap={4}
      >
        <GridItem colSpan={2}>
          <Flex alignItems='center' pos='relative'>
            {!currentTimestamp || !totalDuration ? (
              <Text
                mt='5px'
                minW={'100px'}
                color={'clique.white'}
                fontFamily={'Poppins'}
                fontWeight={400}
                fontSize={'smSubHead'}
                lineHeight={'1'}
                mr='30px'
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
                mr='30px'
              >
                {moment(currentTimestamp * 1000).format('mm:ss')} /{' '}
                {moment(totalDuration * 1000).format('mm:ss')}
              </Text>
            )}
            {!isMuted ? (
              <Tooltip
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
                label='Unute'
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

              <Flex
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
                      label='Unlike'
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
              </Flex>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={3} justifySelf='center' h='35px'>
          <Flex alignItems='center'>
            <Tooltip
              label='Back'
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
                label='Pause'
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
                    fontSize='35px'
                    cursor='pointer'
                    as={BsPauseFill}
                    color={'clique.white'}
                    onClick={() => videoHandler('pause')}
                    mx='20px'
                  />
                </span>
              </Tooltip>
            ) : (
              <Tooltip
                label='Play'
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
                    as={BsFillPlayFill}
                    onClick={() => videoHandler('play')}
                    color={'clique.white'}
                    mx='20px'
                  />
                </span>
              </Tooltip>
            )}

            <Tooltip
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
        <GridItem colSpan={2} justifySelf='end'>
          <Flex alignItems='center' h='100%'>
            {video.uploader_id._id !== userProfile._id && (
              <GiftModal isFullScreen={isFullScreen} video={video} />
            )}
            <VideoOptionMenuAd
              isLoop={isLoop}
              setIsLoop={setIsLoop}
              player={videoRef}
              video={video}
            />

            {!isFullScreen ? (
              <Tooltip
                label='Fullscreen'
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
                    onClick={() => {
                      setIsFullScreen(!isFullScreen);
                      const video: any =
                        document.getElementById('content_video');
                      video.requestFullscreen();
                    }}
                    as={BsFullscreen}
                    color={'clique.white'}
                  />
                </span>
              </Tooltip>
            ) : (
              <Tooltip
                label='Normal'
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
                    color={'clique.white'}
                    onClick={() => {
                      setIsFullScreen(!isFullScreen);
                      document?.exitFullscreen();
                    }}
                    as={MdFullscreenExit}
                  />
                </span>
              </Tooltip>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}

export default ControlAd;
