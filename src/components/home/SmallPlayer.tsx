import React, { useEffect } from 'react';

import { Box, Slider, SliderFilledTrack, SliderTrack } from '@chakra-ui/react';

import { contentData, createObjectURL, decrypt } from '../../constants/utils';

const {Player, ControlBar, BigPlayButton} = require('video-react');

function SmallPlayer({video}: {video: contentData}) {
  const [currentTimestamp, setCurrentTimestamp] = React.useState(0);
  const [totalDuration, setTotalDuration] = React.useState(0);
  const playerRef: any = React.useRef(null);
  const [url, setUrl] = React.useState('');

  useEffect(() => {
    async function display(videoStream: string) {
      let blob = await fetch(videoStream).then((r) => r.blob());
      var videoUrl = createObjectURL(blob);
      setUrl(videoUrl);
    }

    display(decrypt(video.video));
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.subscribeToStateChange((state: any) => {
        setCurrentTimestamp(state.currentTime);
        setTotalDuration(state.duration);
      });
    }
  }, []);
  return (
    <Box h='220px'>
      <Player
        controls={false}
        playing={true}
        ref={playerRef}
        muted={true}
        autoPlay={true}
        fluid={false}
        src={url}
        height={'100%'}
        width={'100%'}
      >
        <ControlBar
          className='my-class'
          autoHide={false}
          disableDefaultControls={true}
        ></ControlBar>
        <BigPlayButton position='center' />
      </Player>
      <Slider
        mb={'20px'}
        aria-label='slider-ex-1'
        defaultValue={0}
        value={
          totalDuration !== 0 ? (currentTimestamp / totalDuration) * 100 : 0
        }
        onChange={(val) => {
          const timestamp = (val * totalDuration) / 100;
          playerRef.current.seek(timestamp);
        }}
      >
        <SliderTrack h='4px' rounded='0' bg='clique.grey'>
          <SliderFilledTrack rounded='0' bg='clique.base' />
        </SliderTrack>
      </Slider>
    </Box>
  );
}

export default SmallPlayer;
