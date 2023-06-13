import {useRouter} from 'next/router';
import React, {use, useEffect} from 'react';
import {MdArrowBackIosNew} from 'react-icons/md';
import {useAppDispatch, useAppSelector} from 'redux/app/hooks';
import {
  useSaveVideoMutation,
  useUnSaveVideoMutation,
} from 'redux/services/content.service';
import {useGetUserQuery} from 'redux/services/user.service';
import {setUser} from 'redux/slices/authSlice';

/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import {Cloudinary} from '@cloudinary/url-gen';
import Color from '@constants/color';
import DownloadIcon from '@icons/DownloadIcon';
import LoopIcon from '@icons/LoopIcon';
import OptionsIcon from '@icons/OptionsIcon';
import VideoQualityIcon from '@icons/VideoQualityIcon';

import {API, baseUrl, contentData} from '../../constants/utils';

function VideoOptionMenu({
  player,
  video,
  isLoop,
  setIsLoop,
  setUrl,
  url,
  qualityFunc,
}: any) {
  const {userProfile} = useAppSelector((store) => store.app.userReducer);

  const [saveVideo, saveVideoStatus] = useSaveVideoMutation();
  const [unSaveVideo, unSaveVideoStatus] = useUnSaveVideoMutation();
  const {data, refetch} = useGetUserQuery(userProfile?._id);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const router = useRouter();

  // console.log('url', url);

  useEffect(() => {
    if (player.current) {
      player.current.subscribeToStateChange((state: any) => {
        if (state.loop) {
          setIsLoop(true);
        }
      });
    }
  }, [isLoop]);

  useEffect(() => {
    if (data) {
      dispatch(
        setUser({
          payload: data.data,
        }),
      );
    }
  }, [data]);

  const handleSaveVideo = async (save: string) => {
    if (save === 'save') {
      await saveVideo({videoId: video._id});
      toast({
        title: 'You have successfully saved this video',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      refetch();
    } else {
      await unSaveVideo(video._id);
      toast({
        title: 'You have successfully unsaved this video',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      refetch();
    }
  };

  const [videoQuality, setVideoQuality] = React.useState('auto');
  const [showVideoQuality, setShowVideoQuality] = React.useState(false);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dwaflsglz',
    },
    url: {
      secure: true,
    },
  });

  const [timeAsAtUrlChange, setTimeAsAtUrlChange] = React.useState(0);

  useEffect(() => {
    const updateUrl = async () => {
      const videoUrl = cld.video(url);

      if (videoQuality === 'auto') {
        videoUrl.quality(videoQuality);
      } else {
        videoUrl.quality(Number(videoQuality));
      }

      videoUrl.format('mp4');

      const newUrl = videoUrl.toURL();

      const arr = newUrl.split('/');
      let currentTime = 0;
      player.current.subscribeToStateChange(async (state: any) => {
        currentTime = state.currentTime;
        setTimeAsAtUrlChange(currentTime);
      });

      setUrl(
        arr.slice(0, 7).join('/') +
          '/' +
          arr.slice(15).join('/').split('.')[0] +
          '.mp4',
      );
      qualityFunc(timeAsAtUrlChange);
    };

    updateUrl();
  }, [videoQuality]);

  return (
    <Menu closeOnSelect={false} placement='top'>
      <MenuButton aria-label='Options'>
        <Icon
          mx='7px'
          fontSize='28px'
          cursor={'pointer'}
          as={OptionsIcon}
          color={'clique.white'}
        />
      </MenuButton>

      <MenuList
        fontFamily={'Poppins'}
        p='30px'
        // pr="60px"
        bg={Color().greyAndWhite}
        w='300px'
        border={'none'}
      >
        {showVideoQuality && (
          <Flex
            alignItems={'center'}
            pb='10px'
            mb='20px'
            borderBottom={'1px solid #e5e5e550'}
          >
            <Icon
              mr='10px'
              cursor={'pointer'}
              onClick={() => setShowVideoQuality(false)}
              as={MdArrowBackIosNew}
            />

            <Text>Video Quality</Text>
          </Flex>
        )}
        {!showVideoQuality && (
          <MenuItem
            bg='none'
            icon={<Icon fontSize={'24px'} as={DownloadIcon} />}
            aria-label='Download'
            onClick={() => {
              !userProfile?.savedVideos.find(
                (each: contentData) => each._id === video._id,
              )
                ? handleSaveVideo('save')
                : handleSaveVideo('unsave');
              // player.current.download();
            }}
          >
            {!userProfile?.savedVideos.find(
              (each: contentData) => each._id === video._id,
            )
              ? 'Save Video'
              : 'Unsave Video'}
          </MenuItem>
        )}

        {showVideoQuality && (
          <MenuOptionGroup
            defaultValue={videoQuality}
            type='radio'
            onChange={(value) => {
              setVideoQuality(value as string);
            }}
          >
            {[
              {name: 'auto', value: 'auto'},
              // { name: "1080p", value: "80" },
              {name: '720p', value: '60'},
              {name: '480p', value: '40'},
              {name: '240p', value: '20'},
            ].map((each) => (
              <MenuItemOption bg='none' key={each.name} value={each.value}>
                {each.name}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        )}

        {!showVideoQuality && (
          <MenuItem
            bg='none'
            icon={<Icon fontSize={'24px'} as={VideoQualityIcon} />}
            onClick={() => {
              setShowVideoQuality(true);
            }}
          >
            Video Quality ({videoQuality})
          </MenuItem>
        )}
        {!showVideoQuality && (
          <MenuItem
            bg='none'
            onClick={() => {
              setIsLoop(isLoop ? false : true);
              localStorage.setItem('loop', isLoop ? 'false' : 'true');
              player.current.loop = player.current.loop ? false : true;
            }}
            icon={<Icon fontSize={'24px'} as={LoopIcon} />}
          >
            Loop Video <Text as='span'>({isLoop ? 'On' : 'Off'})</Text>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}

export default VideoOptionMenu;
