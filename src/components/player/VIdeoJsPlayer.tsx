import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "videojs-contrib-ads";
import "videojs-ima";

import "video.js/dist/video-js.css";
import Script from "next/script";
import Head from "next/head";
import Link from "next/link";

const VIdeoJsPlayer = ({ ima, ...props }: any) => {
  return (
    <>
      <Head>
        <Link href="path/to/video-js.css" rel="stylesheet" />
        <Link rel="stylesheet" href="path/to/videojs-contrib-ads.css" />
        <Link rel="stylesheet" href="/dist/videojs.ima.css" />
      </Head>
      <video
        id="content_video"
        className="video-js vjs-default-skin"
        controls
        preload="auto"
        width="500"
        height="400"
      >
        <source
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          type="video/mp4"
        />
      </video>

      <Script src="/public\videojs\src\js\video.js/path/to/video.js"></Script>
      <Script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></Script>
      <Script src="/path/to/videojs-contrib-ads.js"></Script>
      <Script src="/dist/videojs.ima.js"></Script>
      <Script src="/player.js"></Script>
    </>
  );
};

export default VIdeoJsPlayer;
