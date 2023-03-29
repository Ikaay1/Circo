// import React, { useRef, useEffect } from "react";
// import videojs from "video.js";
// import "videojs-contrib-ads";
// import "videojs-ima";

// import "video.js/dist/video-js.css";
// import { Box } from "@chakra-ui/react";

// const VideoPlayer = ({ ima, ...props }: any) => {
//   const videoRef: any = React.useRef(null);
//   const playerRef: any = React.useRef(null);
//   const { options, onReady } = props;

//   React.useEffect(() => {
//     // Make sure Video.js player is only initialized once
//     if (!playerRef.current) {
//       // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
//       const videoElement = document.createElement("video-js");

//       videoElement.classList.add("vjs-big-play-centered");
//       videoRef.current.appendChild(videoElement);

//       const player = (playerRef.current = videojs(videoElement, options, () => {
//         videojs.log("player is ready");
//         onReady && onReady(player);
//       }));
//       // player.ima(ima);

//       // You could update an existing player in the `else` block here
//       // on prop change, for example:
//     } else {
//       const player = playerRef.current;

//       player.autoplay(options.autoplay);
//       player.src(options.sources);
//       // player.ima(ima);
//     }
//   }, [options, videoRef]);

//   // Dispose the Video.js player when the functional component unmounts
//   React.useEffect(() => {
//     const player = playerRef.current;

//     return () => {
//       if (player && !player.isDisposed()) {
//         player.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [playerRef]);

//   return (
//     <Box data-vjs-player>
//       <Box as="div" ref={videoRef} />
//     </Box>
//   );
// };

// export default VideoPlayer;

import 'videojs-contrib-ads';
import 'videojs-ima';
import 'video.js/dist/video-js.css';

import React, {useEffect, useRef, useState} from 'react';
import videojs from 'video.js';

const VideoJsPlayer = ({ima, ...props}: any) => {
  const videoRef: any = useRef(null);

  useEffect(() => {
    if (videoRef?.current) {
      const player: any = videojs(videoRef.current, props);

      console.log(player);
      player.ima(ima);

      return () => {
        player.dispose();
      };
    }
  });

  return (
    <div data-vjs-player>
      <video autoPlay playsInline ref={videoRef} className='video-js' />
    </div>
  );
};

export default VideoJsPlayer;
