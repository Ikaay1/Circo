import moment from 'moment';
import React from 'react';
import { BiDislike, BiLike } from 'react-icons/bi';
import { BsFillPlayFill, BsFullscreen, BsPauseFill } from 'react-icons/bs';
import { GoMute, GoUnmute } from 'react-icons/go';
import { MdFullscreenExit } from 'react-icons/md';
import { useAppSelector } from 'redux/app/hooks';

import { Box, Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
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
  handleLike,
  handleDislike,
}: any) {
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  return (
    <Grid templateColumns='repeat(7, 1fr)' px='30px' py='20px' gap={4}>
      <GridItem colSpan={2}>
        <Flex alignItems='center'>
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
            <Icon
              fontSize='smHead'
              cursor={'pointer'}
              onClick={() => setIsMuted(!isMuted)}
              as={GoUnmute}
            />
          ) : (
            <Icon
              fontSize='smHead'
              cursor={'pointer'}
              onClick={() => setIsMuted(!isMuted)}
              as={GoMute}
            />
          )}{' '}
          <Flex ml='30px' alignItems={'center'}>
            <Flex
              flexDir='column'
              justify={'center'}
              cursor={'pointer'}
              alignItems={'center'}
            >
              <Box onClick={handleLike}>
                <Icon
                  color={
                    video.likes.includes(userProfile?._id)
                      ? 'clique.base'
                      : 'clique.white'
                  }
                  mr='5px'
                  fontSize='head'
                  as={BiLike}
                />
              </Box>
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
              flexDir='column'
              justify={'center'}
              cursor={'pointer'}
              mx='10px'
              alignItems={'center'}
            >
              <Box onClick={handleDislike}>
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
              </Box>
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
      <GridItem colSpan={3} justifySelf='center'>
        <Flex alignItems='center'>
          <Icon fontSize='bigHead' cursor='pointer' as={PrevIcon} />
          {!isPlay ? (
            <Icon
              fontSize='35px'
              cursor='pointer'
              as={BsPauseFill}
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
          ) : (
            <Icon
              fontSize='bigHead'
              cursor='pointer'
              as={BsFillPlayFill}
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
          )}
          <Icon fontSize='30px' cursor='pointer' as={NextIcon} />
        </Flex>
      </GridItem>
      <GridItem colSpan={2} justifySelf='end'>
        <Flex alignItems='center' h='100%'>
          {video.uploader_id._id !== userProfile._id && (
            <GiftModal video={video} />
          )}
          <VideoOptionMenu player={playerRef} video={video} />
          {!isFullScreen ? (
            <Icon
              fontSize='smHead'
              cursor={'pointer'}
              onClick={() => {
                setIsFullScreen(!isFullScreen);
                const video: any = document.getElementById('video');
                video.requestFullscreen();
              }}
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
              as={MdFullscreenExit}
            />
          )}
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default Control;
