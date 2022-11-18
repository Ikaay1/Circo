import React from "react";
import { useRouter } from "next/router";
import { Box, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import PlaylistDetails from "@components/profile/PlaylistDetails";
import SideMenu from "@components/profile/SideMenu";
import Header from "@components/widgets/Header";
import { channelMenu, scrollBarStyle } from "@constants/utils";
import { useGetSinglePlaylistQuery } from "redux/services/playlist.service";
import CliqueLoader from "@components/home/CliqueLoader";
import { useAppSelector } from "redux/app/hooks";
import HomeSideMenu from "@components/widgets/sideMenu";

const Playlist = () => {
  const router = useRouter();
  const id = router?.query?.playlistId;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetSinglePlaylistQuery(id);
  const { userProfile } = useAppSelector((store) => store.app.userReducer);
  return (
    <Box bg={useColorModeValue("clique.primaryBg", "clique.primaryBg")}>
      <Header upload={onOpen} />
      <Box h={{ lg: "90vh" }} display="flex">
        <Box flex="1.3" h="100%">
          {userProfile?._id === data?.data?.playlist?.userId ? (
            <SideMenu menu={channelMenu} />
          ) : (
            <HomeSideMenu />
          )}
        </Box>
        <Box flex="5.5" h="100%" overflowY="scroll" sx={scrollBarStyle}>
          <PlaylistDetails
            playlist={data?.data?.playlist}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Playlist;
