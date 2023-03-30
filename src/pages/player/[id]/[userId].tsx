import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "videojs-contrib-ads";
import "videojs-ima";

import "video.js/dist/video-js.css";
import Script from "next/script";
import { Box } from "@chakra-ui/react";
import VideoPlayer from "@components/player/VIdeoJsPlayer";
import Link from "next/link";
import Head from "next/head";

function Index() {
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
          width="640px"
          style={{ width: "100%", height: "480px" }}
          height="480px"
          autoPlay
        >
          <source
            src="https://storage.googleapis.com/gvabox/media/samples/android.mp4"
            type="video/mp4"
          />
        </video>
        <Script src="//googleads.github.io/videojs-ima/node_modules/video.js/dist/video.min.js" />
        <Script src="//imasdk.googleapis.com/js/sdkloader/ima3.js" />
        <Script src="//googleads.github.io/videojs-ima/node_modules/videojs-contrib-ads/dist/videojs.ads.min.js" />
        <Script src="//googleads.github.io/videojs-ima/dist/videojs.ima.js" />

        <Script async src="/js/player.js" />
      </Box>
    </>
  );
}

export default Index;
