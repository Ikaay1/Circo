import { Box, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import PlaylistDetails from "@components/profile/PlaylistDetails";
import SideMenu from "@components/profile/SideMenu";
import Header from "@components/widgets/Header";
import { channelMenu, scrollBarStyle } from "@constants/utils";
import { useRouter } from "next/router";
import { useGetSinglePlaylistQuery } from "redux/services/playlist.service";

const Playlist = () => {
  const router = useRouter();
  const id = router.query.playlistId;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetSinglePlaylistQuery(id);
  return (
    <Box bg={useColorModeValue("clique.primaryBg", "clique.primaryBg")}>
      <Header upload={onOpen} />
      <Box h={{ lg: "90vh" }} display="flex">
        <Box flex="1.3" h="100%">
          
          <SideMenu menu={channelMenu} />
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
