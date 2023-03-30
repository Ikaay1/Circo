import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import React, { useEffect, useRef } from "react";

import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderTrack,
} from "@chakra-ui/react";

import ControlAd from "./ControlAd";
import ControlMobileAd from "./ControlMobileAd";

function AdVideoJsPlayer({ url }: { url: string }) {
  return (
    <>
      <Head>
        <Link
          rel="stylesheet"
          href="//googleads.github.io/videojs-ima/node_modules/video.js/dist/video-js.min.css"
        />
        <Link
          rel="stylesheet"
          href="//googleads.github.io/videojs-ima/node_modules/videojs-contrib-ads/dist/videojs.ads.css"
        />
        <Link
          rel="stylesheet"
          href="//googleads.github.io/videojs-ima/dist/videojs.ima.css"
        />
      </Head>
      <Box>
        <video
          id="content_video"
          className="video-js vjs-default-skin"
          controls
          preload="auto"
          style={{ width: "100%", height: "480px" }}
          height="480px"
          autoPlay
          loop
        >
          <source src={url} type="video/mp4" />
        </video>

        {/* <Flex
          bg='clique.blackGrey'
          overflow={'hidden'}
          mt='auto'
          borderBottomRadius={'20px'}
          flexDir={'column'}
          minH='80px'
          h={'80px'}
          maxH={'80px'}
          alignItems={'center'}
          justifyContent={'flex-start'}
        > */}
        {/* progress */}
        {/* <Slider aria-label='slider-ex-1' defaultValue={0}>
            <SliderTrack h='10px' rounded='0' bg='clique.grey'>
              <SliderFilledTrack rounded='0' bg='clique.base' />
            </SliderTrack>
          </Slider> */}

        {/* control */}

        {/* <Box display={{base: 'none', lg: 'block'}}>
            <ControlAd />
          </Box>
          <Box display={{lg: 'none'}}>
            <ControlMobileAd />
          </Box>
        </Flex> */}

        <Script async src="/js/player.js" />
      </Box>
    </>
  );
}

export default AdVideoJsPlayer;
