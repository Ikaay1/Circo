import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/app/hooks";
import {
  useSaveVideoMutation,
  useUnSaveVideoMutation,
} from "redux/services/content.service";
import { useGetUserQuery } from "redux/services/user.service";
import { setUser } from "redux/slices/authSlice";

/* eslint-disable react-hooks/exhaustive-deps */
import {
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import DownloadIcon from "@icons/DownloadIcon";
import LoopIcon from "@icons/LoopIcon";
import OptionsIcon from "@icons/OptionsIcon";

import { API, baseUrl, contentData } from "../../constants/utils";

function VideoOptionMenu({ player, video, isLoop, setIsLoop }: any) {
  const { userProfile } = useAppSelector((store) => store.app.userReducer);

  const [saveVideo, saveVideoStatus] = useSaveVideoMutation();
  const [unSaveVideo, unSaveVideoStatus] = useUnSaveVideoMutation();
  const { data, refetch } = useGetUserQuery(userProfile?._id);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!userProfile?._id) {
      window.location.replace("/login");
    }
  }, [userProfile?._id, router]);

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
        })
      );
    }
  }, [data]);

  const handleSaveVideo = async (save: string) => {
    if (save === "save") {
      await saveVideo({ videoId: video._id });
      toast({
        title: "You have successfully saved this video",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      refetch();
    } else {
      await unSaveVideo(video._id);
      toast({
        title: "You have successfully unsaved this video",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      refetch();
    }
  };

  return (
    <Menu closeOnSelect>
      <MenuButton aria-label="Options">
        <Icon
          fontSize="28px"
          mx={{ base: "10px", lg: "30px" }}
          cursor={"pointer"}
          as={OptionsIcon}
          color={"clique.white"}
        />
      </MenuButton>
      <MenuList
        fontFamily={"Poppins"}
        p="30px"
        pr="60px"
        bg="clique.black"
        border={"none"}
      >
        <MenuItem
          icon={<Icon fontSize={"24px"} as={DownloadIcon} />}
          onClick={() => {
            //downloaf video
            !userProfile?.savedVideos.find(
              (each: contentData) => each._id === video._id
            )
              ? handleSaveVideo("save")
              : handleSaveVideo("unsave");
            // player.current.download();
          }}
        >
          {!userProfile?.savedVideos.find(
            (each: contentData) => each._id === video._id
          )
            ? "Save Video"
            : "Unsave Video"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsLoop(isLoop ? false : true);
            localStorage.setItem("loop", isLoop ? "false" : "true");
            player.current.loop = player.current.loop ? false : true;
          }}
          icon={<Icon fontSize={"24px"} as={LoopIcon} />}
        >
          Loop Video <Text as="span">({isLoop ? "On" : "Off"})</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default VideoOptionMenu;
