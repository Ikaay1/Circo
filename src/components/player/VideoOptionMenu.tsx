import React, { useEffect } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from 'redux/app/hooks';
import { useSaveVideoMutation } from 'redux/services/content.service';
import { useGetUserQuery } from 'redux/services/user.service';
import { setUser } from 'redux/slices/authSlice';

/* eslint-disable react-hooks/exhaustive-deps */
import {
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import DownloadIcon from '@icons/DownloadIcon';
import LoopIcon from '@icons/LoopIcon';
import OptionsIcon from '@icons/OptionsIcon';

function VideoOptionMenu({player, video}: any) {
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const [isLoop, setIsLoop] = React.useState<any>(null);
  const [saveVideo, saveVideoStatus] = useSaveVideoMutation();
  const {data, refetch} = useGetUserQuery(userProfile._id);
  const dispatch = useAppDispatch();
  console.log('video', video);

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

  const handleSaveVideo = async () => {
    console.log('entered');
    await saveVideo({videoId: video._id});
    refetch();
  };

  return (
    <Menu closeOnSelect>
      <MenuButton aria-label='Options'>
        <Icon fontSize='28px' mx='30px' cursor={'pointer'} as={OptionsIcon} />
      </MenuButton>
      <MenuList
        fontFamily={'Poppins'}
        p='30px'
        pr='60px'
        bg='clique.black'
        border={'none'}
      >
        <MenuItem
          icon={
            <Icon
              fontSize={'24px'}
              onClick={() => {
                //downloaf video
                handleSaveVideo();
                // player.current.download();
              }}
              as={DownloadIcon}
            />
          }
        >
          Save Video
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsLoop(isLoop ? false : true);
            player.current.loop = player.current.loop ? false : true;
          }}
          icon={<Icon fontSize={'24px'} as={LoopIcon} />}
        >
          Loop Video <Text as='span'>({isLoop ? 'On' : 'Off'})</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default VideoOptionMenu;
