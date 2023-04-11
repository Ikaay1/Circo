import 'videojs-contrib-ads';
import 'videojs-ima';
import 'video.js/dist/video-js.css';

import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import React, {useEffect, useRef, useState} from 'react';
import videojs from 'video.js';

import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderTrack,
} from '@chakra-ui/react';
import {contentData} from '@constants/utils';

import ControlAd from './ControlAd';
import ControlMobileAd from './ControlMobileAd';

function AdVideoJsPlayer({
  video,
  videoIdsList,
  url,
}: {
  video: contentData;
  videoIdsList: {
    _id: string;
  }[];
  url: string;
}) {
  const currentVideoIndex = videoIdsList.findIndex(
    (videoId) => videoId?._id === video._id,
  );
  const [nextVideoIndex, setNextVideoIndex] = React.useState<number | null>(
    null,
  );

  const [prevVideoIndex, setPrevVideoIndex] = React.useState<number | null>(
    null,
  );
  const [isLoop, setIsLoop] = React.useState<any>(
    localStorage.getItem('loop') === 'true' ? true : false,
  );
  const videoRef: any = useRef(null);
  const [play, setPlay] = useState(true);
  const [currentTimestamp, setCurrentTimestamp] = React.useState(0);
  const [totalDuration, setTotalDuration] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const videoHandler = (control: string) => {
    if (control === 'play') {
      videoRef.current.play();
      setPlay(true);
    } else if (control === 'pause') {
      videoRef.current.pause();
      setPlay(false);
    }
  };

  useEffect(() => {
    const length = videoIdsList.length;

    if (currentVideoIndex === 0 && length > 1) {
      setPrevVideoIndex(null);
      setNextVideoIndex(currentVideoIndex + 1);
      return;
    } else if (currentVideoIndex === length - 1 && length > 1) {
      setNextVideoIndex(0);
      setPrevVideoIndex(currentVideoIndex - 1);
      return;
    } else if (length === 1) {
      setNextVideoIndex(null);
      setPrevVideoIndex(null);
      return;
    } else {
      setNextVideoIndex(currentVideoIndex + 1);
      setPrevVideoIndex(currentVideoIndex - 1);
    }
  }, [currentVideoIndex, videoIdsList]);

  useEffect(() => {
    if (videoRef?.current) {
      setCurrentTimestamp(videoRef?.current?.currentTime);
      setTotalDuration(videoRef?.current?.duration);
    }
  }, [videoRef?.current?.currentTime, videoRef?.current?.duration]);

  React.useEffect(() => {
    function onFullscreenChange() {
      setIsFullScreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);
  const ref = React.useRef(null);
  return (
    <>
      <Head>
        <Link
          rel='stylesheet'
          href='//googleads.github.io/videojs-ima/node_modules/video.js/dist/video-js.min.css'
        />
        <Link
          rel='stylesheet'
          href='//googleads.github.io/videojs-ima/node_modules/videojs-contrib-ads/dist/videojs.ads.css'
        />
        <Link
          rel='stylesheet'
          href='//googleads.github.io/videojs-ima/dist/videojs.ima.css'
        />
      </Head>
      <Box
        id='video2'
        ref={ref}
        pos={'relative'}
        h={{base: '480px', lg: '580px'}}
        maxH={{base: '480px', lg: '580px'}}
      >
        <video
          id='content_video'
          className='video-js vjs-default-skin'
          controls={false}
          preload='auto'
          style={{
            width: '100%',
            minHeight: isFullScreen ? 'calc(100vh - 80px)' : '480px',
            height: isFullScreen ? 'calc(100vh- 80px)' : '480px',
            maxHeight: isFullScreen ? 'calc(100vh - 80px)' : '480px',
          }}
          autoPlay={true}
          onPause={() => setPlay(false)}
          onPlay={() => setPlay(true)}
          // loop
          ref={videoRef}
          muted={isMuted}
        >
          <source src={url} type='video/mp4' />
        </video>

        <Flex
          bg='clique.blackGrey'
          pos={'absolute'}
          bottom={'0'}
          w={'100%'}
          overflow={'hidden'}
          mt='auto'
          borderBottomRadius={'20px'}
          flexDir={'column'}
          minH='80px'
          h={'80px'}
          maxH={'80px'}
          alignItems={'center'}
          justifyContent={'flex-start'}
        >
          {/* progress */}
          <Slider
            aria-label='slider-ex-1'
            defaultValue={0}
            value={
              totalDuration !== 0 ? (currentTimestamp / totalDuration) * 100 : 0
            }
            onChange={(val) => {
              const timestamp = (val * totalDuration) / 100;
              videoRef.current.currentTime = timestamp;
              setCurrentTimestamp(timestamp);
            }}
          >
            <SliderTrack h='10px' rounded='0' bg='clique.grey'>
              <SliderFilledTrack rounded='0' bg='clique.base' />
            </SliderTrack>
          </Slider>

          {/* control */}

          <Box display={{base: 'none', lg: 'block'}}>
            <ControlAd
              play={play}
              videoHandler={videoHandler}
              setIsMuted={setIsMuted}
              isMuted={isMuted}
              nextVideoIndex={nextVideoIndex}
              prevVideoIndex={prevVideoIndex}
              videoIdsList={videoIdsList}
              video={video}
              currentTimestamp={currentTimestamp}
              totalDuration={totalDuration}
              isFullScreen={isFullScreen}
              setIsFullScreen={setIsFullScreen}
              isLoop={isLoop}
              setIsLoop={setIsLoop}
              videoRef={videoRef}
              Bref={ref}
            />
          </Box>
          <Box display={{lg: 'none'}} w='100%'>
            <ControlMobileAd
              play={play}
              videoHandler={videoHandler}
              setIsMuted={setIsMuted}
              isMuted={isMuted}
              nextVideoIndex={nextVideoIndex}
              prevVideoIndex={prevVideoIndex}
              videoIdsList={videoIdsList}
              video={video}
              currentTimestamp={currentTimestamp}
              totalDuration={totalDuration}
              isFullScreen={isFullScreen}
              setIsFullScreen={setIsFullScreen}
              isLoop={isLoop}
              setIsLoop={setIsLoop}
              videoRef={videoRef}
              Bref={ref}
            />
          </Box>
        </Flex>

        <Script async src='/js/player.js' />
      </Box>
    </>
  );
}

export default AdVideoJsPlayer;
