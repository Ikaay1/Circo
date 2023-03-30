import 'videojs-contrib-ads';
import 'videojs-ima';

import moment from 'moment';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect } from 'react';

import {
	Box,
	Flex,
	Slider,
	SliderFilledTrack,
	SliderTrack,
} from '@chakra-ui/react';
import { contentData, createObjectURL, decrypt } from '@constants/utils';

import BigAd from './BigAd';
import Control from './Control';
import ControlMobile from './ControlMobile';
import SmallAd from './SmallAd';
import VIdeoJsPlayer from './VIdeoJsPlayer';

const {Player, ControlBar, BigPlayButton} = require('video-react');

function VideoPlayer({
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
  const router = useRouter();
  const currentVideoIndex = videoIdsList.findIndex(
    (videoId) => videoId?._id === video._id,
  );

  const [nextVideoIndex, setNextVideoIndex] = React.useState<number | null>(
    null,
  );

  const [prevVideoIndex, setPrevVideoIndex] = React.useState<number | null>(
    null,
  );

  const playerRef: any = React.useRef(null);
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

  return (
    <>
      <Flex
        pos={'relative'}
        borderRadius='20px'
        id='video'
        overflow={'hidden'}
        bg='black'
        alignItems={'center'}
        w={'100%'}
      >
        <VIdeoJsPlayer
          controls
          // autoplay
          sources={[
            {
              src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
              type: 'video/mp4',
            },
          ]}
          ima={{
            adTagUrl:
              'https://pubads.g.doubleclick.net/gampad/ads?iu=/8948849/Teste-video&description_url=https%3A%2F%2Fwww.personare.com.br&tfcd=0&npa=0&sz=400x300%7C620x350%7C640x480&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
          }}
        />

        <Script src='//imasdk.googleapis.com/js/sdkloader/ima3.js'></Script>
      </Flex>
    </>
  );
}

export default VideoPlayer;
