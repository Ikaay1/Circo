import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "videojs-contrib-ads";
import "videojs-ima";

import "video.js/dist/video-js.css";
import Script from "next/script";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";

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
          width="640px"
          style={{ width: "100%", height: "480px" }}
          height="480px"
          autoPlay
          src={url}
        >
          {/* <source
            src="https://storage.googleapis.com/gvabox/media/samples/android.mp4"
            type="video/mp4"
          /> */}
        </video>

        <Script async src="/js/player.js" />
      </Box>
    </>
  );
}

export default AdVideoJsPlayer;
